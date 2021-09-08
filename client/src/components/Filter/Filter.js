import React from 'react'
import { Row } from 'react-bootstrap'

const Filter = ({count, Sort, category, handleChangeSort, handleFilterProducts}) => {
    return(
        <Row className="justify-content-md-center">
            <div className="filter-result add-space">
                {count} products found
            </div>
            <div className="filter-sort add-space">
                <label>Order by{' '}
                    <select value={Sort} onChange={handleChangeSort}>
                        <option default value="">Select</option>
                        <option value="pricelow">lowest to highest(price)</option>
                        <option value="pricehigh">highest to lowest(price)</option>
                        <option value="ratinglow">lowest to highest(rating)</option>
                        <option value="ratinghigh">highest to lowest(rating)</option>
                        <option value="quantitylow">lowest to highesr(quantity)</option>
                        <option value="quantityhigh">highest to lowest(quantity)</option>
                        <option value="reviewlow">lowest to highesr(review)</option>
                        <option value="reviewhigh">highest to lowest(review)</option>
                    </select>
                </label>
            </div>
            <div className="filter-category add-space">
                Filter{' '}
                <select value={category} onChange={handleFilterProducts}>
                    <option default value="">All</option>
                    <option value="fruits">Fruits</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="grains">Grains</option>
                </select>
            </div>
        </Row>
    )
}

export default Filter
