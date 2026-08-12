import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Messages from "../studentApp/pages/Messages";
import CommunityDiscussion from "../studentApp/pages/mentor/CommunityDiscussion";

// Mock auth store
vi.mock("../studentApp/store/authStore", () => ({
  useAuthStore: () => ({
    user: { uid: "user_123", name: "Test User", role: "Student" }
  })
}));

// Mock messageService
vi.mock("../lib/messageService", () => ({
  subscribeToConversations: vi.fn((uid, callback) => {
    callback([
      {
        id: "conv_1",
        participants: ["user_123", "user_456"],
        names: { user_456: "Alice Smith" },
        lastMessage: "Hello there!",
        updatedAt: new Date().toISOString()
      }
    ]);
    return () => {};
  }),
  subscribeToMessages: vi.fn((convId, callback) => {
    callback([
      {
        id: "msg_1",
        senderId: "user_456",
        text: "Hello there!",
        timestamp: { seconds: Math.floor(Date.now() / 1000) }
      },
      {
        id: "msg_2",
        senderId: "user_123",
        text: "Hi Alice!",
        timestamp: { seconds: Math.floor(Date.now() / 1000) }
      }
    ]);
    return () => {};
  }),
  sendMessage: vi.fn().mockResolvedValue(true),
  editMessage: vi.fn().mockResolvedValue(true),
  parseMessageDate: (ts) => (ts?.seconds ? new Date(ts.seconds * 1000) : new Date(ts || Date.now())),
  formatMessageTime: () => "10:45 AM",
  formatContactTime: () => "10:45 AM",
  getFormattedDateHeader: () => "Today"
}));

// Mock userService
vi.mock("../lib/userService", () => ({
  getUserProfile: vi.fn().mockResolvedValue({ name: "Alice Smith" })
}));

describe("Chat Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Messages page with contacts and chat history", async () => {
    render(
      <MemoryRouter>
        <Messages />
      </MemoryRouter>
    );

    // Verify contact name appears in sidebar and header
    await waitFor(() => {
      expect(screen.getAllByText(/Alice Smith/i).length).toBeGreaterThan(0);
    });

    // Verify messages appear
    expect(screen.getByText("Hello there!")).toBeInTheDocument();
    expect(screen.getByText("Hi Alice!")).toBeInTheDocument();

    // Verify date header badge is rendered
    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  it("allows sending a message in Messages page", async () => {
    const { sendMessage } = await import("../lib/messageService");
    
    render(
      <MemoryRouter>
        <Messages />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/ENTER_MESSAGE_DATA/i)).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(/ENTER_MESSAGE_DATA/i);
    fireEvent.change(input, { target: { value: "New test message" } });
    
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(sendMessage).toHaveBeenCalledWith("conv_1", "user_123", "New test message");
    });
  });

  it("renders CommunityDiscussion page and allows switching channels", async () => {
    render(
      <MemoryRouter>
        <CommunityDiscussion />
      </MemoryRouter>
    );

    // Verify default channel header
    await waitFor(() => {
      expect(screen.getAllByText(/Global_Chat/i).length).toBeGreaterThan(0);
    });

    // Switch to Announcements channel
    const announcementsBtn = screen.getByText(/Announcements/i);
    fireEvent.click(announcementsBtn);

    await waitFor(() => {
      expect(screen.getAllByText(/Announcements/i).length).toBeGreaterThan(0);
    });
  });
});
