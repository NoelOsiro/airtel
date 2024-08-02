import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/components/Tables/Pagination';

describe('Pagination', () => {
  const totalPages = 5;
  const currentPage = 2;
  const onPageChange = jest.fn();

  beforeEach(() => {
    render(
      <Pagination 
        totalPages={totalPages} 
        currentPage={currentPage} 
        onPageChange={onPageChange} 
      />
    );
  });

  it('renders the correct number of pages', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(totalPages);
  });

  it('applies the correct styles to the current page button', () => {
    const currentPageButton = screen.getByText(currentPage.toString());
    expect(currentPageButton).toHaveClass('bg-blue-500 text-white');
  });

  it('applies the correct styles to non-current page buttons', () => {
    const nonCurrentPageButtons = screen.getAllByRole('button', { 
      name: (name) => name !== currentPage.toString()
    });
    nonCurrentPageButtons.forEach(button => {
      expect(button).toHaveClass('bg-gray-200 text-black');
    });
  });

  it('calls onPageChange with the correct page number when a button is clicked', () => {
    const pageButton = screen.getByText('3');
    fireEvent.click(pageButton);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
