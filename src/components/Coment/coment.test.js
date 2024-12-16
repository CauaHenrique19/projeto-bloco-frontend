import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Context } from "../../context";
import Coment from ".";

const mockUser = {
  id: "123",
  username: "testuser",
};

const mockComent = {
  id: "coment1",
  user_id: "456",
  user_name: "John Doe",
  user_user: "johndoe",
  content: "This is a test comment",
  created_at: "2024-01-01",
  media_name: "Test Media",
  avaliation_id: "avaliation1",
};

const renderComponent = (coment = mockComent, user = mockUser) => {
  return render(
    <BrowserRouter>
      <Context.Provider value={{ user }}>
        <Coment coment={coment} />
      </Context.Provider>
    </BrowserRouter>
  );
};

describe("Coment Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders comment details correctly", () => {
    renderComponent();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
    expect(screen.getByText("Test Media")).toBeInTheDocument();
  });

  test("handles like functionality", () => {
    renderComponent();

    const likeCountElement = screen.getByText("0");
    expect(likeCountElement).toBeInTheDocument();

    const likeButton = screen.getByRole("button", { name: /heart-outline/i });
    fireEvent.click(likeButton);
    expect(screen.getByText("1")).toBeInTheDocument();

    const savedLikes = JSON.parse(localStorage.getItem("likes") || "[]");
    expect(savedLikes).toHaveLength(1);
    expect(savedLikes[0].coment_id).toBe("coment1");

    fireEvent.click(likeButton);
    expect(screen.getByText("0")).toBeInTheDocument();

    const updatedLikes = JSON.parse(localStorage.getItem("likes") || "[]");
    expect(updatedLikes).toHaveLength(0);
  });

  test("truncates long media name", () => {
    const longMediaNameComent = {
      ...mockComent,
      media_name: "This is a very long media name that should be truncated",
    };

    renderComponent(longMediaNameComent);

    expect(
      screen.getByText("This is a very long media name that...")
    ).toBeInTheDocument();
  });

  test("shows different links based on user", () => {
    renderComponent();

    const userProfileLink = screen.getByRole("link", {
      name: /person-outline/i,
    });
    expect(userProfileLink).toHaveAttribute("href", "/user/johndoe");

    const avaliationLink = screen.getByRole("link", { name: /quotation/i });
    expect(avaliationLink).toHaveAttribute("href", "/avaliation/avaliation1");
  });

  test("does not show user profile link when comment is from current user", () => {
    const commentFromCurrentUser = {
      ...mockComent,
      user_id: "123",
    };

    renderComponent(commentFromCurrentUser);

    const userProfileLinks = screen.queryAllByRole("link", {
      name: /person-outline/i,
    });
    expect(userProfileLinks).toHaveLength(0);
  });
});
