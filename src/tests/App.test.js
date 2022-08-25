import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockData from "../../cypress/mocks/testData";
import App from "../App";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
});
afterEach(() => {
  jest.resetAllMocks();
});

describe("Testa se <App /> tem um coverage de 60%", () => {
  it("Testa se a interação com os elementos de <Table /> estão funcionando", async () => {
    render(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const column = screen.getByTestId("column-filter");
    userEvent.selectOptions(column, 'population');
    const comparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(comparison, 'menor que');
    const value = screen.getByTestId("value-filter");
    userEvent.type(value,'11111');
    const btnFil = screen.getByTestId("button-filter");
    userEvent.click(btnFil)
    userEvent.selectOptions(column, 'diameter');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(value,'7777');
    userEvent.click(btnFil)
  });
}); 