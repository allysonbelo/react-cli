/* eslint-disable react/prop-types */
import './styles.css';

const ItemList = ({ title, description, link }) => {
    return (
        <div className='item-list'>
            <a href={link} target='_blank' rel='noopener noreferrer'>
                <strong>{title}</strong>
            </a>
            <p>{description}</p>
            <hr />
        </div>
    );
}

export default ItemList;
