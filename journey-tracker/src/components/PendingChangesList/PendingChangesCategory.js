import React from 'react';

//Renders a header for one of the categories in the pending changes list.
//Also lists each item in that category if showList is true
const PendingChangesCategory = props =>
    <div>
        <li className="list-group-item list-group-item-primary"
            onClick={props.onClick}>
            <h5>
                {props.name}
                {props.list.length > 0 &&
                    <span>
                        <span className='dropdown-toggle' />
                        <span className="badge badge-primary badge-pill">{props.list.length}</span>
                    </span>
                }
            </h5>
        </li>
        <ul>
            {props.showList && props.list}
        </ul>
    </div>

export default PendingChangesCategory;