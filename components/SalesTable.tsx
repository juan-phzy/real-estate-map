import { ReonomyPropertyItem } from '@/constants';

interface SalesTableProps {
  salesData: ReonomyPropertyItem[];
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};


const SalesTable = ({ salesData }: SalesTableProps) => {

  return (
    <div className="sales-table-container">
      <table className='st-table'>
        <thead className='st-head'>
          <tr className='st-row-head'>
            <th className='st-header-cell text-center'>#</th>
            <th className='st-header-cell text-left'>Buyer</th>
            <th className='st-header-cell text-left'>Seller</th>
            <th className='st-header-cell text-right'>Recorded Date</th>
          </tr>
        </thead>
        <tbody className='st-body'>
          {salesData.map((propertyItem, index) => (
            <tr key={index} className='st-row'>
              <td className='st-col-cell text-center'>{index + 1}</td>
              <td className='st-col-cell text-left'>
                {propertyItem.reonomyPropertySale.items[0]?.reonomySaleBuyerFormatted.items[0]?.name || 'N/A'}
              </td>
              <td className='st-col-cell text-left'>
                {propertyItem.reonomyPropertySale.items[0]?.reonomySaleSellerFormatted.items[0]?.name || 'N/A'}
              </td>
              <td className='st-col-cell text-right'>
                {formatDate(propertyItem.reonomyPropertySale.items[0]?.sale_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
