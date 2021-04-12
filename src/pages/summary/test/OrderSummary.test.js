import { queryByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  userEvent.click(checkbox);

  //   make sure checkbox is checked and button is now available
  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();

  //   click and disable checkbox
  userEvent.click(checkbox);

  //   make sure checkbox unchecked and button disabled
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("popover responds to hover", () => {
  render(<SummaryForm></SummaryForm>);

  // popoever starts hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // appears when mouseover the label
  const tnc = screen.getByText(/terms and conditions/i);
  userEvent.hover(tnc);

  const popoever = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popoever).toBeInTheDocument();

  //disappears when mouse removed
  userEvent.unhover(tnc);
  const nextNullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nextNullPopover).not.toBeInTheDocument();
});
