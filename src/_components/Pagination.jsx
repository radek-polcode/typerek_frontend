import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './Pagination.module.css'

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

class Pagination extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    onPageChanged: PropTypes.func.isRequired,
    perPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalRecords: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    
    this.state = {
      currentPage: this.props.currentPage,
      perPage: this.props.perPage,
      totalPages: this.props.totalPages,
      totalRecords: this.props.totalRecords
    }

    const pageNeighbours = 1
    const perPage = this.state.perPage
    const totalRecords = this.state.totalRecords

    this.perPage = typeof perPage === 'number' ? perPage : 20;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

    // pageNeighbours can be: 0, 1 or 2
    this.pageNeighbours = typeof pageNeighbours === 'number'
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;

  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (
        nextProps.currentPage !== prevState.currentPage ||
        nextProps.perPage !== prevState.perPage ||
        nextProps.totalPages !== prevState.totalPages ||
        nextProps.totalRecords !== prevState.totalRecords
      ) {
      return { 
        currentPage: nextProps.currentPage,
        perPage: nextProps.perPage,
        totalPages: nextProps.totalPages,
        totalRecords: nextProps.totalRecords
      };
    }
    else return null;
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  countNextPage() {
    return this.state.currentPage + (this.pageNeighbours * 2) + 1
  }

  countPreviousPage() {
    return this.state.currentPage - (this.pageNeighbours * 2) - 1
  }

  gotoPage = page => evt => {
    const { onPageChanged = f => f } = this.props;

    const currentPage = page;

    const paginationData = {
      currentPage,
      perPage: this.state.perPage,
      totalPages: this.state.totalPages,
      totalRecords: this.state.totalRecords
    };

    this.setState({ currentPage });
    onPageChanged(paginationData)
  }

   /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  fetchPageNumbers = () => {

    const totalPages = this.state.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (this.pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {

      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];

    }

    return range(1, totalPages);
  }

  render() {
    if (!this.state.totalRecords || this.state.totalPages === 1) return null;

    const { currentPage, perPage } = this.state;
    const nextPage = this.countNextPage()
    const previousPage = this.countPreviousPage()
    const pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <nav className={styles.pagination__container} aria-label="Pagination">
          <ul className="pagination">
            { pages.map((page, index) => {

              if (page === LEFT_PAGE) return (
                <li key={index} className="page-item">
                  <Link
                    className="page-link" 
                    href={`/admin/teams/${previousPage}`}
                    aria-label="Previous" 
                    onClick={this.gotoPage(previousPage)}
                    to={`/admin/teams/${previousPage}`}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </Link>
                </li>
              );

              if (page === RIGHT_PAGE) return (
                <li key={index} className="page-item">
                  <Link
                    aria-label="Next" 
                    className="page-link" 
                    href={`/admin/teams/${nextPage}`}
                    onClick={this.gotoPage(nextPage)}
                    to={`/admin/teams/${nextPage}`}
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </Link>
                </li>
              );

              return (
                <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>

                  <Link
                    className="page-link" 
                    href={`/admin/teams/${page}`}
                    onClick={ this.gotoPage(page) }
                    to={`/admin/teams/${page}`}
                  >
                  { page }
                  </Link>
                </li>
              );

            }) }

          </ul>
        </nav>
      </Fragment>
    );
  }
}

export { Pagination };

