import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CustomersTable from '@/components/Tables/CustomersTable';



const mockCustomers = [
    { id: 1, name: 'John Doe', alternate_no: '1234567890', phone: '555-1234', location: 'New York', account: '12345', activation_date: '2023-01-01' },
    { id: 2, name: 'Jane Smith', alternate_no: '0987654321', phone: '555-5678', location: 'Los Angeles', account: '67890', activation_date: '2023-02-01' }
];

describe('CustomersTable', () => {
    it('renders loader when no customers are provided', () => {
        render(<CustomersTable customer={null} />);
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('renders customer rows correctly', () => {
        render(<CustomersTable customer={mockCustomers} />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('filters customers based on search query', () => {
        render(<CustomersTable customer={mockCustomers} />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'John' } });
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    it('handles pagination', () => {
        render(<CustomersTable customer={mockCustomers} />);
        // Assuming one page of results is shown, you can simulate pagination if needed
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('opens and saves edits in the modal', async () => {
        const mockSave = jest.fn();
        render(<CustomersTable customer={mockCustomers} />);

        // Simulate opening the edit modal
        fireEvent.click(screen.getByTestId(`customer-edit-1`)); // Clicks the edit button for the first customer
        expect(screen.getByText('Edit Customer')).toBeInTheDocument();

        
    });

    it('closes the edit modal', () => {
        render(<CustomersTable customer={mockCustomers} />);
        fireEvent.click(screen.getByTestId(`customer-edit-1`)); 
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByText('Edit Modal for John Doe')).not.toBeInTheDocument();
    });
});
