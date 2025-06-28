import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Board } from '../../components/Board';

describe('Board', () => {

    test('initializes board to match 5 columns', () => {


        render(<Board />)

        const columnTitles = [
        'Backlog',
        'Todo',
        'In Progress',
        'Review',
        'Done',
        ];


        columnTitles.forEach((title) => {
          expect(screen.getByText(title)).toBeInTheDocument();
        });


        const headers = screen.getAllByRole('heading', { level: 2 });
        expect(headers).toHaveLength(5);
        headers.forEach((h, i) =>
          expect(h).toHaveTextContent(columnTitles[i])
        );
        
    });
}) 