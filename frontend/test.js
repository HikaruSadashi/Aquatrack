var i = 0, result = [];

while(i < items.length){
    result.push([])
    for(var key in items[i].fields){
        result[result.length-1].push(items[i].fields[key])	
    }
    i++
}

document.write(JSON.stringify(result, null, 4));