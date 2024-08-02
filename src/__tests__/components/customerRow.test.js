import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomerRow from '@/components/Tables/CustomerRow';
  describe('CustomerRow', () => {
    const mockCustomer = {
      id: '1',
      name: 'John Doe',
      alternate_no: '1234567890',
      location: 'New York',
      router_id: 'router123',
      activation_date: '2023-01-01',
    };
  
    const mockOnEdit = jest.fn();
  
    it('renders customer details correctly', () => {
      render(<CustomerRow customer={mockCustomer} onEdit={mockOnEdit} />);
  
      // Check if customer name is rendered correctly
      const customerName = screen.getByText(mockCustomer.name);
      expect(customerName).toBeInTheDocument();
  
      // Check if alternate number is rendered correctly
      const alternateNo = screen.getByText(mockCustomer.alternate_no);
      expect(alternateNo).toBeInTheDocument();
  
      // Check if location is rendered correctly
      const location = screen.getByText(mockCustomer.location);
      expect(location).toBeInTheDocument();
  
      // Check if router ID is rendered correctly
      const routerId = screen.getByText(mockCustomer.router_id);
      expect(routerId).toBeInTheDocument();
  
      // Check if activation date is rendered correctly
      const activationDate = screen.getByText(mockCustomer.activation_date);
      expect(activationDate).toBeInTheDocument();
    });
  
    it('calls onEdit function when edit button is clicked', () => {
      render(<CustomerRow customer={mockCustomer} onEdit={mockOnEdit} />);
  
      // Simulate clicking the edit button
      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);
  
      // Check if onEdit function is called with the correct customer
      expect(mockOnEdit).toHaveBeenCalledTimes(1);
      expect(mockOnEdit).toHaveBeenCalledWith(mockCustomer);
    });
  
    it('applies the correct styles', () => {
      render(<CustomerRow customer={mockCustomer} onEdit={mockOnEdit} />);
  
      // Check if the container has the correct styles
      const container = screen.getByTestId('customer-row');
      expect(container).toHaveClass('grid', 'grid-cols-3', 'sm:grid-cols-6', 'border-b', 'border-stroke', 'dark:border-strokedark');
  
      // Check if the customer name has the correct styles
      const customerName = screen.getByText(mockCustomer.name);
      expect(customerName).toHaveClass('hidden', 'text-black', 'dark:text-white', 'sm:block');
  
      // Check if the alternate number has the correct styles
      const alternateNo = screen.getByText(mockCustomer.alternate_no);
      expect(alternateNo).toHaveClass('text-black', 'dark:text-white');
  
      // Check if the location has the correct styles
      const location = screen.getByText(mockCustomer.location);
      expect(location).toHaveClass('text-meta-3');
  
      // Check if the router ID has the correct styles
      const routerId = screen.getByText(mockCustomer.router_id);
      expect(routerId).toHaveClass('text-black', 'dark:text-white');
  
      // Check if the activation date has the correct styles
      const activationDate = screen.getByText(mockCustomer.activation_date);
      expect(activationDate).toHaveClass('text-meta-5');
  
      // Check if the edit button has the correct styles
      const editButton = screen.getByText('Edit');
      expect(editButton).toHaveClass('text-blue-500', 'hover:underline', 'dark:text-blue-400');
    });
  });
  