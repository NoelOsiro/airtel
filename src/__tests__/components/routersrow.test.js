import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import RouterRow from '@/components/Tables/RouterRow';
describe('RouterRow', () => {
    const mockRouter = {
        id: 1,
        created_at: '2020-06-02',
        odu_number: '74567890',
        account_number: '1234567890'
    };

    const mockOnEdit = jest.fn();

    it('renders customer details correctly', () => {
        render(<RouterRow router={mockRouter} onEdit={mockOnEdit} />);

        // Check if alternate number is rendered correctly
        const alternateNo = screen.getByText(mockRouter.account_number);
        expect(alternateNo).toBeInTheDocument();

        // Check if location is rendered correctly
        const location = screen.getByText(mockRouter.odu_number);
        expect(location).toBeInTheDocument();
    });

    it('calls onEdit function when edit button is clicked', () => {
        render(<RouterRow router={mockRouter} onEdit={mockOnEdit} />);

        // Simulate clicking the edit button
        const editButton = screen.getByText('Edit');
        fireEvent.click(editButton);

        // Check if onEdit function is called with the correct customer
        expect(mockOnEdit).toHaveBeenCalledTimes(1);
        expect(mockOnEdit).toHaveBeenCalledWith(mockRouter);
    });

    it('applies the correct styles', () => {
        render(<RouterRow router={mockRouter} onEdit={mockOnEdit} />);

        // Check if the container has the correct styles
        const container = screen.getByTestId('router-row');
        expect(container).toHaveClass('grid', 'grid-cols-3', 'sm:grid-cols-5', 'border-b', 'border-stroke', 'dark:border-strokedark');

        // Check if the alternate number has the correct styles
        const alternateNo = screen.getByText(mockRouter.account_number);
        expect(alternateNo).toHaveClass('text-black', 'dark:text-white');

        // Check if the router ID has the correct styles
        const routerId = screen.getByText(mockRouter.odu_number);
        expect(routerId).toHaveClass('text-black', 'dark:text-white');

        // Check if the activation date has the correct styles
        const activationDate = screen.getByText(mockRouter.created_at);
        expect(activationDate).toHaveClass('text-meta-5');

        // Check if the edit button has the correct styles
        const editButton = screen.getByText('Edit');
        expect(editButton).toHaveClass('text-blue-500', 'hover:underline', 'dark:text-blue-400');
    });
});
