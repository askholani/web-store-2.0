import Pagination from './Pagination'
import Product from './Product/Product'
import LoaderFetching from './LoaderFetching'

const WishListComp = ({
  wishlist,
  isError,
  isLoading,
  onHandlePage,
  onHandleDetailPage,
}) => {
  if (isLoading || !wishlist) {
    return (
      <div className='fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
        <LoaderFetching />
      </div>
    )
  }

  if (isError) {
    return <div>{isError}</div>
  }
  return (
    <section className='flex flex-col gap-y-4'>
      <div className='flex justify-around flex-wrap gap-y-4'>
        {wishlist.data.map((value) => (
          <div
            className='relative w-1/2'
            key={value.id}
            onClick={() => onHandleDetailPage(value.product)}>
            <Product key={value.id} value={value.product} wishlist={true} />
          </div>
        ))}
      </div>
      <Pagination
        onPageChange={onHandlePage}
        currentPage={wishlist.current_page}
        lastPage={wishlist.last_page}
      />
    </section>
  )
}

export default WishListComp
