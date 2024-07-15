const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  lastPage,
  firstPage = 1,
}) => {
  const handlePrevPage = () => {
    const page = currentPage - 1
    onPageChange(page)
  }

  const handleNextPage = () => {
    const page = currentPage + 1
    onPageChange(page)
  }

  const handleFirstPage = () => {
    onPageChange(firstPage)
  }

  const handleLastPage = () => {
    onPageChange(lastPage)
  }
  return (
    <div className='join flex justify-center'>
      <button onClick={handlePrevPage} className='join-item btn'>
        «
      </button>
      <button onClick={handleFirstPage} className='join-item btn'>
        first
      </button>
      <button className='join-item btn btn-active'>{currentPage}</button>
      <button onClick={handleLastPage} className='join-item btn'>
        last
      </button>
      <button onClick={handleNextPage} className='join-item btn'>
        »
      </button>
    </div>
  )
}

export default Pagination
