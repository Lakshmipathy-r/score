/**
 * CODE-SPLITTING WITH React.lazy() — HOW IT WORKS
 * ─────────────────────────────────────────────────
 *
 * BEFORE (eager loading):
 *   import Dashboard from './studentApp/pages/Dashboard';
 *   → Vite bundles Dashboard.js + ALL its dependencies into the single
 *     main chunk. Browser must download everything before rendering anything.
 *     Result: 1 chunk, ~1.1 MB.
 *
 * AFTER (lazy loading):
 *   const Dashboard = lazy(() => import('./studentApp/pages/Dashboard'));
 *   → Vite emits a separate .js chunk for Dashboard and each lazy page.
 *     The browser downloads a chunk only when the user first navigates to it.
 *     Result: many small chunks, main chunk ~150 KB, rest fetched on demand.
 *
 * HOW React.lazy() WORKS INTERNALLY:
 *   1. `lazy(fn)` stores `fn` (the dynamic import) but does NOT call it yet.
 *   2. When React first tries to render <Dashboard />, it calls `fn()`.
 *   3. While the Promise is pending, React "suspends" — it throws the Promise.
 *   4. The nearest <Suspense fallback={...}> catches it and renders the fallback.
 *   5. When the Promise resolves (chunk loaded), React renders the component.
 *   6. On subsequent visits, the chunk is already in the browser cache → instant.
 *
 * WHY Suspense must wrap Routes:
 *   A lazy component must ALWAYS have a <Suspense> ancestor in the tree.
 *   Without it, React throws an error instead of showing a fallback.
 *   Wrapping all <Routes> with one <Suspense> covers every lazy child.
 *
 * WHAT IS NOT LAZY (kept eager):
 *   - AuthProvider, ProtectedRoute, StudentLayout — these are layout/auth
 *     wrappers that need to be available immediately. They're also tiny.
 *   - RouteLoader, TooltipProvider, QueryClient — infrastructure, not pages.
 */

import { lazy, Suspense } from 'react';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster as HotToaster } from 'react-hot-toast';
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ── Eager (always needed immediately) ─────────────────────────────────────────
import StudentLayout from "./studentApp/components/StudentLayout";
import AuthProvider from "./studentApp/components/AuthProvider";
import ProtectedRoute from "./studentApp/components/ProtectedRoute";
import RouteLoader from "./studentApp/components/RouteLoader";

// ── Lazy pages — each becomes its own chunk file ───────────────────────────────
// Vite splits these at the dynamic `import()` boundary.
// Each arrow function is called only when that route is first rendered.
const Index           = lazy(() => import("./pages/Index"));
const NotFound        = lazy(() => import("./pages/NotFound"));
const Login           = lazy(() => import("./studentApp/pages/Login"));
const Register        = lazy(() => import("./studentApp/pages/Register"));
const ForgotPassword  = lazy(() => import("./studentApp/pages/ForgotPassword"));
const Dashboard       = lazy(() => import("./studentApp/pages/Dashboard"));
const GigMarketplace  = lazy(() => import("./studentApp/pages/GigMarketplace"));
const Applications    = lazy(() => import("./studentApp/pages/Applications"));
const Messages        = lazy(() => import("./studentApp/pages/Messages"));
const Reviews         = lazy(() => import("./studentApp/pages/Reviews"));
const Settings        = lazy(() => import("./studentApp/pages/Settings"));
const AlumniMentorship = lazy(() => import("./studentApp/pages/AlumniMentorship"));
const Profile         = lazy(() => import("./studentApp/pages/Profile"));
const FindTalent      = lazy(() => import("./studentApp/pages/recruiter/FindTalent"));
const ApplicantProfile = lazy(() => import("./studentApp/pages/recruiter/ApplicantProfile"));

// Mentor / Community module — grouped separately for clarity
const MentorsList        = lazy(() => import("./studentApp/pages/mentor/MentorsList"));
const MentorProfile      = lazy(() => import("./studentApp/pages/mentor/MentorProfile"));
const MentorDashboardHome = lazy(() => import("./studentApp/pages/mentor/MentorDashboardHome"));
const CommunityDiscussion = lazy(() => import("./studentApp/pages/mentor/CommunityDiscussion"));
const CommunityThreadView = lazy(() => import("./studentApp/pages/mentor/CommunityThreadView"));

// ── Query client (created once, outside component to avoid re-instantiation) ──
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <HotToaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#000000',
            color: '#CCFF00',
            border: '1px solid #333333',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '14px',
            textTransform: 'uppercase',
          },
          success: { iconTheme: { primary: '#CCFF00', secondary: '#000000' } },
          error:   { iconTheme: { primary: '#FF003C', secondary: '#000000' } },
        }}
      />
      <AuthProvider>
        <BrowserRouter>
          {/*
           * <Suspense> wraps all <Routes> so that ANY lazy child that
           * suspends (because its chunk is still loading) is caught here.
           * RouteLoader is shown in that window — typically 50-200ms on a
           * warm cache, longer on first visit to a section.
           */}
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />

              {/* Student App Routes */}
              <Route path="/student" element={<StudentLayout />}>
                <Route index element={<Navigate to="login" replace />} />
                <Route path="login"           element={<Login />} />
                <Route path="register"        element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="dashboard"    element={<Dashboard />} />
                  <Route path="gigs"         element={<GigMarketplace />} />
                  <Route path="applications" element={<Applications />} />
                  <Route path="messages"     element={<Messages />} />
                  <Route path="reviews"      element={<Reviews />} />
                  <Route path="settings"     element={<Settings />} />
                  <Route path="mentorship"   element={<AlumniMentorship />} />
                  <Route path="profile"      element={<Profile />} />
                  <Route path="find-talent"  element={<FindTalent />} />
                  <Route path="applicant/:id" element={<ApplicantProfile />} />
                </Route>
              </Route>

              {/* Mentor / Community Routes */}
              <Route element={<StudentLayout />}>
                <Route element={<ProtectedRoute />}>
                  <Route path="/mentors"                      element={<MentorsList />} />
                  <Route path="/mentors/:id"                  element={<MentorProfile />} />
                  <Route path="/mentor-dashboard"             element={<MentorDashboardHome />} />
                  <Route path="/mentor-dashboard/community"   element={<CommunityDiscussion basePath="mentor-dashboard/community" />} />
                  <Route path="/student-dashboard/community"  element={<CommunityDiscussion basePath="student-dashboard/community" />} />
                  <Route path="/community/:category"          element={<CommunityDiscussion basePath="community" />} />
                  <Route path="/community"                    element={<CommunityDiscussion basePath="community" />} />
                  <Route path="/community/:category/:threadId" element={<CommunityThreadView />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
