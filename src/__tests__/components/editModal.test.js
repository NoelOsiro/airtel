import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditModal from '@/components/Tables/CustomersModal';


const mockCustomer= {
  id: 1,
  name: 'John Doe',
  alternate_no: '1234567890',
  location: '123 Main St',
  email: 'john.doe@example.com',
  router_id: 123,
  activation_date: '2023-01-01',
};

describe('EditModal', () => {
  const onClose = jest.fn();
  const onSave = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    onSave.mockClear();
  });

  it('renders correctly', () => {
    render(<EditModal customer={mockCustomer} onClose={onClose} onSave={onSave} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    expect(screen.getByLabelText('Account No')).toBeInTheDocument();
    expect(screen.getByLabelText('Activation Date')).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    render(<EditModal customer={mockCustomer} onClose={onClose} onSave={onSave} />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '0987654321' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: '456 Elm St' } });
    fireEvent.change(screen.getByLabelText('Account No'), { target: { value: '456' } });
    fireEvent.change(screen.getByLabelText('Activation Date'), { target: { value: '2023-02-01' } });

    fireEvent.submit(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith({
        ...mockCustomer,
        name: 'Jane Doe',
        alternate_no: '0987654321',
        email: 'jane.doe@example.com',
        location: '456 Elm St',
        router_id: 456,
        activation_date: '2023-02-01',
      });
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('displays validation errors for invalid data', async () => {
    render(<EditModal customer={mockCustomer} onClose={onClose} onSave={onSave} />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Account No'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Activation Date'), { target: { value: '' } });

    fireEvent.submit(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(screen.getByText('Location is required')).toBeInTheDocument();
      expect(screen.getByText('Required')).toBeInTheDocument();
      expect(screen.getByText('Activation date is required')).toBeInTheDocument();
    });

    expect(onSave).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('triggers onClose when the Cancel button is clicked', () => {
    render(<EditModal customer={mockCustomer} onClose={onClose} onSave={onSave} />);

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onClose).toHaveBeenCalled();
  });
});
