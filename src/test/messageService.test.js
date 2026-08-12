import { describe, it, expect } from "vitest";
import { parseMessageDate, formatMessageTime, formatContactTime, getFormattedDateHeader } from "../lib/messageService";

describe("messageService date & time formatting", () => {
  it("parses Firestore timestamps accurately", () => {
    const timestamp = { seconds: 1772300000 };
    const parsed = parseMessageDate(timestamp);
    expect(parsed).toBeInstanceOf(Date);
    expect(parsed.getTime()).toBe(1772300000 * 1000);
  });

  it("parses ISO strings correctly", () => {
    const isoStr = "2026-08-12T10:00:00.000Z";
    const parsed = parseMessageDate(isoStr);
    expect(parsed.toISOString()).toBe(isoStr);
  });

  it("handles null or invalid timestamps gracefully", () => {
    const parsedNull = parseMessageDate(null);
    expect(parsedNull).toBeInstanceOf(Date);
    expect(isNaN(parsedNull.getTime())).toBe(false);
  });

  it("formats message time nicely", () => {
    const timestamp = { seconds: 1772300000 };
    const formatted = formatMessageTime(timestamp);
    expect(formatted).toMatch(/\d{1,2}:\d{2}/);
  });

  it("returns Today header for same day timestamps", () => {
    const now = new Date();
    const header = getFormattedDateHeader(now);
    expect(header).toBe("Today");
  });
});
