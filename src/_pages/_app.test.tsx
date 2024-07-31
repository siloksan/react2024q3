import { FunctionComponent, ReactElement, ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { NextPageContext } from 'next';
import { Router } from 'next/router';
import App, { GetLayoutProps } from './_app';

vi.mock('./SelectedItemsProvider', () => ({
  SelectedItemsProvider: ({ children }: { children: ReactNode }) => (
    <div data-testid="selected-items-provider">{children}</div>
  ),
}));

vi.mock('./ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: ReactNode }) => <div data-testid="theme-provider">{children}</div>,
}));

describe('App', () => {
  const children = () => <div>Mock Component</div>;
  const MockComponent: FunctionComponent & {
    getInitialProps?(context: NextPageContext): object | Promise<object>;
    getLayout?: (page: ReactElement, props: GetLayoutProps) => ReactNode;
  } = children;

  it('renders the component with providers', () => {
    render(<App Component={MockComponent} pageProps={{}} router={{} as Router} />);

    expect(screen.getByText(/Mock Component/i)).toBeInTheDocument();
  });
});
