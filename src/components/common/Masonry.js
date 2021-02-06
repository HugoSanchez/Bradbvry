import React from 'react';

// This code is coming from here:
// https://medium.com/the-andela-way/how-to-create-a-masonry-layout-component-using-react-f30ec9ca5e99
// https://codepen.io/john555/pen/GYoyNd

export const Masonry = props => {
	const columnWrapper = {};
    const result = [];
    const innerWidth = window.innerWidth
    const columns  = innerWidth < 800 ? 2 : 3
    const columnWidth = innerWidth * 0.7 / 3

    console.log('cW', columnWidth)
	
	// create columns
	for (let i = 0; i < columns; i++) {
	    columnWrapper[`column${i}`] = [];
	}
	
	// divide children into columns
	for (let i = 0; i < props.children.length; i++) {
        const columnIndex = i % columns;
        columnWrapper[`column${columnIndex}`].push(
            <div 
                key={i}
                style={{ marginBottom: `${props.gap}px`}}>
                {props.children[i]}
            </div>
        );
	}
	
	// wrap children in each column with a div
	for (let i = 0; i < columns; i++) {
        result.push(
            <div
                key={i}
                style={{
                    marginLeft: `${i > 0 ? props.gap : 0}px`,
                    flex: 1, width: `${columnWidth}px`
                }}>
                {columnWrapper[`column${i}`]}
            </div>
        );
	}
  
	return (
        <div style={{ display: 'flex' }}>
            {result}
        </div>
	);
}