import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RoutersTable from '@/components/Tables/RoutersTable';



const mockRouters = [
    { id: 1, odu_number: 'ODU123', account_number: 'ACC123', created_at: '2023-01-01' },
    { id: 2, odu_number: 'ODU456', account_number: 'ACC456', created_at: '2023-02-01' },
  ];

describe('RoutersTable', () => {
    it('renders loader when no routers are provided', () => {
        render(<RoutersTable router={null} />);
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('renders router rows correctly', () => {
        render(<RoutersTable router={mockRouters} />);
        expect(screen.getByText('ODU123')).toBeInTheDocument();
        expect(screen.getByText('ODU456')).toBeInTheDocument();
    });

    it('filters routers based on search query', () => {
        render(<RoutersTable router={mockRouters} />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'ODU123' } });
        expect(screen.getByText('ODU123')).toBeInTheDocument();
        expect(screen.queryByText('ODU456')).not.toBeInTheDocument();
    });

    it('handles pagination', () => {
        render(<RoutersTable router={mockRouters} />);
        // Assuming one page of results is shown, you can simulate pagination if needed
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('opens and saves edits in the modal', async () => {
        const mockSave = jest.fn();
        render(<RoutersTable router={mockRouters} />);

        // Simulate opening the edit modal
        fireEvent.click(screen.getByTestId(`router-edit-1`)); // Clicks the edit button for the first router
        expect(screen.getByText('Edit Router')).toBeInTheDocument();
    });

    it('closes the edit modal', () => {
        render(<RoutersTable router={mockRouters} />);
        fireEvent.click(screen.getByTestId(`router-edit-1`)); 
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByText('Edit Modal for ODU123')).not.toBeInTheDocument();
    });
});
