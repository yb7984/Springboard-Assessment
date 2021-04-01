function starOutGrid(grid) {
    let indexes = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '*') {
                indexes.push([i, j]);
            }
        }
    }

    indexes.forEach(([x , y])=>{
        for (let i = 0 ; i < grid.length ; i ++){
            grid[i][y] = '*';
        }

        for (let j = 0 ; j < grid[x].length ; j ++){
            grid[x][j] = '*';
        }
    });

    return grid;
}
