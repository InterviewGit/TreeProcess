class Node {
    constructor(data) {
        this.data = data;
        this.left = undefined;
        this.right = undefined;
    }
}
var finalHeight = -1;
var finalSum = Number.MIN_VALUE;
/**
 * Returns maximum sum from root to leaf with max height
 * @param {Object} node - Root of the tree is passed.
 * @param {number} height - Running height from root.
 * @param {number} sum - Running sum from root.
 */
function maxSum(node, height, sum) {
    if(node == null) {
        if(height == finalHeight) {
            if(sum > finalSum) {
                finalSum = sum;
            }
        } else if(height > finalHeight) {
            finalHeight = height;

            finalSum = sum;
        }
        return;
    }

    maxSum(node.left, height+1, sum+node.data);
    maxSum(node.right, height+1, sum+node.data);

    return;
}
/**
 * Returns root of tree
 * @param {Object} data - Preorder of tree given as an array object
 */
function createTree(data) {
    let val = data.shift();
    if ( val.toLowerCase().trim() === "null") return null;
    else {
        let node = new Node(parseInt(val, 10));
        node.left = createTree(data);
        node.right = createTree(data);
        return node;
    }
}
/**
 * Helper method for finding maximum sum of tree path
 * @param {string} data - Preorder of tree given as comma seperated string
 */
async function process(data) {
    //resetting values
    finalHeight = -1;
    finalSum = Number.MIN_VALUE;
    data = data + '';
    data = data.split(",");
    root = await createTree(data);
    await maxSum(root,0,0);
    return finalSum + '';
}


module.exports = {
    process: process,
    createTree: createTree,
    maxSum: maxSum,
    finalSum: finalSum
}