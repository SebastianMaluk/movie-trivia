// find id scoreboard and add html
scoreboard = document.getElementById('scoreboard');
// multiline string
jpgs = ['https://a1.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/tor.png&h=70&w=70',
        'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/mia.png&h=70&w=70',
        'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/gs.png&h=70&w=70']
names = ['Sebastian', 'Javier', 'Matias']
scores = [123, 109, 109]
// add child to scoreboard with a for loop
for (i = 0; i < names.length; i++) {
    row = document.createElement('div');
    row.className = 'flex px-2 py-2 items-center';
    scoreboard.appendChild(row);
    // add child to row
    col1 = document.createElement('div');
    col1.className = 'w-5/12 flex';
    row.appendChild(col1);
    // add child to col1
    img = document.createElement('img');
    img.className = 'w-6 sm:w-10 mr-2 self-center';
    img.src = jpgs[i];
    col1.appendChild(img);
    // add child to col1
    col1div = document.createElement('div');
    col1div.className = 'flex flex-col';
    col1.appendChild(col1div);
    // add child to col1div
    col1divp1 = document.createElement('p');
    col1divp1.className = 'text-sm font-bold';
    col1divp1.innerHTML = names[i];
    col1div.appendChild(col1divp1);
    // add child to col1div
    col1divp2 = document.createElement('p');
    col1divp2.className = 'hidden sm:block text-gray-600';
    col1div.appendChild(col1divp2);
    // add child to row
    col2 = document.createElement('div');
    col2.className = 'w-5/12 flex justify-end items-center';
    row.appendChild(col2);
    // add child to col2
    col2p1 = document.createElement('p');
    col2p1.className = 'w-7/12 px-1 text-center';
    col2p1.innerHTML = '0';
    col2.appendChild(col2p1);
    // add child to col2
    col2p2 = document.createElement('p');
    col2p2.className = 'w-7/12 px-1 text-center';
    col2p2.innerHTML = 'FALSE';
    col2.appendChild(col2p2);
    // add child to row
    col3 = document.createElement('p');
    col3.className = 'w-1/6 text-lg sm:text-xl font-bold text-right';
    col3.innerHTML = scores[i];
    row.appendChild(col3);
}
