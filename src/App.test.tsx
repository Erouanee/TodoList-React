import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("TodoList Test", () => {
  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("should add a task test", async () => {
    // ARRANGE
    render(<App />);
    const user = userEvent.setup();
    const todoList = screen.getByRole("list", { name: /Tasks-list/i });

    // ACT
    await user.type(
      screen.getByRole("textbox", { name: /Add a new task/i }),
      "Test 1{Enter}",
    );
    const todoItems = within(todoList).getAllByRole("listitem");

    // EXPECT
    expect(todoItems.map((item) => item.textContent)).toContain("Test 1Medium");
  });

  it("should warn if the task already exist", async () => {
    // ARRANGE
    render(<App />);
    const user = userEvent.setup();

    // ACT
    await user.type(
      screen.getByRole("textbox", { name: /Add a new task/i }),
      "Test 2{Enter}",
    );
    await user.type(
      screen.getByRole("textbox", { name: /Add a new task/i }),
      "Test 2{Enter}",
    );

    // EXPECT
    (expect(alert), `"Test 2" already exist !`);
  });

  it("should check a task", async () => {
    // ARRANGE
    render(<App />);
    const user = userEvent.setup();
    const checkbox = screen.getByRole("checkbox", { name: /checkboxTest 2/i });

    // ACT
    await user.click(checkbox);

    // EXPECT
    expect(checkbox).toBeChecked();
  });

  it("should delete a task", async () => {
    // ARRANGE
    render(<App />);
    const user = userEvent.setup();
    const todoList = screen.getByRole("list", { name: /Tasks-list/i });

    // ACT
    await user.type(
      screen.getByRole("textbox", { name: /Add a new task/i }),
      "Test 3{Enter}",
    );
    await user.click(
      screen.getByRole("button", { name: /delete-buttonTest 3/ }),
    );

    const todoItems = within(todoList).getAllByRole("listitem");

    // EXPECT
    expect(todoItems.map((item) => item.textContent)).not.toContain(
      "Test 3Medium",
    );
  });

  it("should add a task with a filter", async () => {
    // ARRANGE
    render(<App />);
    const user = userEvent.setup();
    const todoList = screen.getByRole("list", { name: /Tasks-list/i });

    // ACT
    await user.type(
      screen.getByRole("textbox", { name: /Add a new task/i }),
      "Test 4",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: /priority-select/i }),
      "High",
    );
    await user.click(screen.getByRole("button", { name: /add-button/i }));

    const todoItems = within(todoList).getAllByRole("listitem");

    // EXPECT
    expect(todoItems.map((item) => item.textContent)).toContain("Test 4High");
  });

  it("should test priority filter", async () => {
    // ARRANGE
    render(<App />);
    const user = userEvent.setup();
    const todoList = screen.getByRole("list", { name: /Tasks-list/i });

    // ACT
    await user.click(screen.getByRole("button", { name: /Show filters/i }));
    await user.click(screen.getByRole("button", { name: /High-Filter/i }));

    const todoItems = within(todoList).getAllByRole("listitem");

    //EXPECT
    expect(todoItems.map((item) => item.textContent)).toContain("Test 4High");
  });

  it("should test search filter", async () => {
    // ARRANGE
    render(<App />);
    const user = userEvent.setup();
    const todoList = screen.getByRole("list", { name: /Tasks-list/i });

    // ACT
    await user.click(screen.getByRole("button", { name: /Show filters/i }));
    await user.type(
      screen.getByRole("textbox", { name: /search-bar/i }),
      "Test 1{Enter}",
    );

    const todoItems = within(todoList).getAllByRole("listitem");

    //EXPECT
    expect(todoItems.map((item) => item.textContent)).toContain("Test 1Medium");
  });
});
