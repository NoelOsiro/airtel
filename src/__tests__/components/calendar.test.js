// Calendar.test.js
import { render, screen } from "@testing-library/react";
import Calendar from "@/components/Calender"; // Adjust the import path as needed
import "@testing-library/jest-dom"; // For extended matchers

describe("Calendar Component", () => {
  test("renders the calendar header with days of the week", () => {
    render(<Calendar />);
    
    const dayHeaders = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    dayHeaders.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  test("renders the correct number of days in the calendar", () => {
    render(<Calendar />);
    
    // Check that the calendar has 31 days in total
    for (let i = 1; i <= 31; i++) {
      expect(screen.getByText(i)).toBeInTheDocument();
    }
  });

  test("renders events correctly", () => {
    render(<Calendar />);
    
    // Check for the example event on December 25
    expect(screen.getByText("App Design")).toBeInTheDocument();
    expect(screen.getByText("25 Dec - 27 Dec")).toBeInTheDocument();
  });

  test("does not render days outside the current month", () => {
    render(<Calendar />);
    
    // Check for days not within the current month range
    expect(screen.queryByText("32")).not.toBeInTheDocument();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});
