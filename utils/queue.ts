export class Queue<T> {
    items: T[];

    constructor() {
        this.items = [];
    }

    // Add element to the back of the queue
    enqueue(element: T): void {
        this.items.push(element);
    }

    // Remove and return the front element of the queue
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.shift();
    }

    // Return the front element of the queue without removing it
    front(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0];
    }

    // Check if the queue is empty
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Get the size of the queue
    size(): number {
        return this.items.length;
    }
}