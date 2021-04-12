import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("initial conditions", () => {
  render(<SummaryForm />);

  // get the checkbox and button
  const checkbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });

  // checkbox should not be checked, and button should be disabled
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("checkbox enables/disables button", () => {
  // render the form
  render(<SummaryForm />);

  //   get the checkbox and button
  const checkbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });

  //   click the checkbox to enable it
  fireEvent.click(checkbox);

  //   make sure checkbox is checked and button is now available
  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();

  //   click and disable checkbox
  fireEvent.click(checkbox);

  //   make sure checkbox unchecked and button disabled
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});
