var inputarr = [10,5,12,8,3,7]

function getMaxDifference(arr){
    if(arr.length>0){
        let max_diff = arr[1] - arr[0]
        for(var i=0; i<arr.length-1; i++){
            for(j=i+1; j<arr.length; j++){
                if(arr[j]-arr[i] > max_diff){
                    max_diff = arr[j]-arr[i]
                }
            }
        }
        return max_diff
    } else {
        return null
    }
}


const maxdiff = getMaxDifference(inputarr)
console.log(maxdiff)