import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditRouterModal from '@/components/Tables/RoutersModal';

const mockRouter = {
  id: 1,
  created_at: '2020-06-02',
  odu_number: '74567890',
  account_number: '1234567890'
};

describe('EditRouterModal', () => {
  const onClose = jest.fn();
  const onSave = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    onSave.mockClear();
  });

  it('renders correctly', () => {
    render(<EditRouterModal router={mockRouter} onClose={onClose} onSave={onSave} />);

    expect(screen.getByLabelText('ODU Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Account Number')).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    render(<EditRouterModal router={mockRouter} onClose={onClose} onSave={onSave} />);

    fireEvent.change(screen.getByLabelText('ODU Number'), { target: { value: '74567890' } });
    fireEvent.change(screen.getByLabelText('Account Number'), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith({
        ...mockRouter,
        odu_number: '74567890',
        account_number: '1234567890'
      });
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('displays validation errors for invalid data', async () => {
    render(<EditRouterModal router={mockRouter} onClose={onClose} onSave={onSave} />);

    fireEvent.change(screen.getByLabelText('ODU Number'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Account Number'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText('ODU number is required')).toBeInTheDocument();
      expect(screen.getByText('Account number is required')).toBeInTheDocument();
    });

    expect(onSave).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('triggers onClose when the Cancel button is clicked', () => {
    render(<EditRouterModal router={mockRouter} onClose={onClose} onSave={onSave} />);

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onClose).toHaveBeenCalled();
  });
});
