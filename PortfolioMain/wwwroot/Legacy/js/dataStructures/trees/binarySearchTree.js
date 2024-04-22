class BinarySearchTree {
    constructor() {
        // root of a binary search tree
        this.root = null;
    }

    // function to be implemented
    // insert(data)
    // remove(data)


    // Helper function
    // findMinNodeBinary()
    // getRootNodeBinary()
    // inorder(NodeBinary)
    // preorder(NodeBinary)              
    // postorder(NodeBinary)
    // search(NodeBinary, data)


    // helper method which creates a new NodeBinary to
    // be inserted and calls insertNodeBinary
    insert(data) {
        // Creating a NodeBinary and initialising
        // with data
        var newNodeBinary = new NodeBinary(data);

        // root is null then NodeBinary will
        // be added to the tree and made root.
        if (this.root === null)
            this.root = newNodeBinary;
        else

            // find the correct position in the
            // tree and add the NodeBinary
            this.insertNode(this.root, newNodeBinary);
    }

    // Method to insert a NodeBinary in a tree
    // it moves over the tree to find the location
    // to insert a NodeBinary with a given data
    insertNode(NodeBinary, newNodeBinary) {
        // if the data is less than the NodeBinary
        // data move left of the tree
        if (newNodeBinary.data < NodeBinary.data) {
            // if left is null insert NodeBinary here
            if (NodeBinary.left === null)
                NodeBinary.left = newNodeBinary;
            else

                // if left is not null recur until
                // null is found
                this.insertNode(NodeBinary.left, newNodeBinary);
        }

        // if the data is more than the NodeBinary
        // data move right of the tree
        else {
            // if right is null insert NodeBinary here
            if (NodeBinary.right === null)
                NodeBinary.right = newNodeBinary;
            else

                // if right is not null recur until
                // null is found
                this.insertNode(NodeBinary.right, newNodeBinary);
        }
    }

    // helper method that calls the
    // removeNodeBinary with a given data
    remove(data) {
        // root is re-initialized with
        // root of a modified tree.
        this.root = this.removeNode(this.root, data);
    }

    // Method to remove NodeBinary with a
    // given data
    // it recur over the tree to find the
    // data and removes it
    removeNode(NodeBinary, key) {

        // if the root is null then tree is
        // empty
        if (NodeBinary === null)
            return null;

        // if data to be delete is less than
        // roots data then move to left subtree
        else if (key < NodeBinary.data) {
            NodeBinary.left = this.removeNode(NodeBinary.left, key);
            return NodeBinary;
        }

        // if data to be delete is greater than
        // roots data then move to right subtree
        else if (key > NodeBinary.data) {
            NodeBinary.right = this.removeNode(NodeBinary.right, key);
            return NodeBinary;
        }

        // if data is similar to the root's data
        // then delete this NodeBinary
        else {
            // deleting NodeBinary with no children
            if (NodeBinary.left === null && NodeBinary.right === null) {
                NodeBinary = null;
                return NodeBinary;
            }

            // deleting NodeBinary with one children
            if (NodeBinary.left === null) {
                NodeBinary = NodeBinary.right;
                return NodeBinary;
            } else if (NodeBinary.right === null) {
                NodeBinary = NodeBinary.left;
                return NodeBinary;
            }

            // Deleting NodeBinary with two children
            // minimum NodeBinary of the right subtree
            // is stored in aux
            var aux = this.findMinNode(NodeBinary.right);
            NodeBinary.data = aux.data;

            NodeBinary.right = this.removeNode(NodeBinary.right, aux.data);
            return NodeBinary;
        }

    }

    // Performs inorder traversal of a tree
    inorder(NodeBinary) {
        if (NodeBinary !== null) {
            this.inorder(NodeBinary.left);
            //console.log(NodeBinary.data);
            this.inorder(NodeBinary.right);
        }
    }

    // Performs preorder traversal of a tree
    preorder(NodeBinary) {
        if (NodeBinary !== null) {
            //console.log(NodeBinary.data);
            this.preorder(NodeBinary.left);
            this.preorder(NodeBinary.right);
        }
    }

    // Performs postorder traversal of a tree
    postorder(NodeBinary) {
        if (NodeBinary !== null) {
            this.postorder(NodeBinary.left);
            this.postorder(NodeBinary.right);
            //console.log(NodeBinary.data);
        }
    }


    findMinNode(NodeBinary) {
        // if left of a NodeBinary is null
        // then it must be minimum NodeBinary
        if (NodeBinary.left === null)
            return NodeBinary;
        else
            return this.findMinNode(NodeBinary.left);
    }

    getRootNode() {
        return this.root;
    }

    // search for a NodeBinary with given data
    search(NodeBinary, data) {
        // if trees is empty return null
        if (NodeBinary === null)
            return null;

        // if data is less than NodeBinary's data
        // move left
        else if (data < NodeBinary.data)
            return this.search(NodeBinary.left, data);

        // if data is less than NodeBinary's data
        // move left
        else if (data > NodeBinary.data)
            return this.search(NodeBinary.right, data);

        // if data is equal to the NodeBinary data
        // return NodeBinary
        else
            return NodeBinary;
    }


}


class NodeBinary {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}