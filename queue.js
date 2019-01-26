class _Node {
    constructor(data) {
        this.data = data;
        this.next = null;//towards the front end of the Line
        this.prev = null;//towards the back end of The Line
    }
}

class Queue {
    constructor() {
        this.endofTheLine = null;//back<adds new guys here << E-Q here at this spot
        this.frontofTheLine = null;// front << this leaves next << DE-Q this guy
    }
   
    enqueue(data) {
        //create a node with the data that you want to add to the queue
        const node = new _Node(data);
        //if the queue is empty, 
        //make the node the first node on the queue
        if (this.endofTheLine === null) {
            this.endofTheLine = node;
            this.frontofTheLine = node;
            return;
        }
        //----------------------------------------------
        //if there is something on the queue already
        //then take the node that is currently at the end of the queue
        //and link it to the new node
       //    0EL.next=1.prev=null,1.next=2.prev=NewG, 2, 3, 4, 5, 6E, 7, 8FL
        node.next = this.endofTheLine;
        //here this.endofTheLine is = to the 1
        this.endofTheLine.prev = node;
       // this.endofline.next.next.data >>> 2
        //make the new node the last item on the queue
        this.endofTheLine = node;
        return;
    }

    peek() {
        //show the next up for service-ing:
        if(this.frontofTheLine === null) {
            return null;
        }
       return this.frontofTheLine.data;
    }
    dequeue() {
        //if the queue is empty, there is nothing to return
        if (this.frontofTheLine === null) {
            return null;
        }
        //make the frontofTheLine item on the queue to be the next to D
        // ->End   2 3 <-Front
        // take this.frontofTheLine.prev  => the new front Guy
        // we make this.front's next become null, front guy has no ahead of him
        //the item that is next on the line 
        // the item after the current first item
        let secondInLine = this.frontofTheLine.prev;
         //if this is the last item in the queue
         if (secondInLine === null) {
            this.frontofTheLine = null;
            this.endofTheLine = null;
            return null;
        }
        secondInLine.next = null;
        this.frontofTheLine = secondInLine;
        return this.frontofTheLine.data;//returns new front guy value
    }
    
}

module.exports = { _Node, Queue };