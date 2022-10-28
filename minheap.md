# Tutor Hour Ticket Project

### In this project I crerated  a priority queue that would be able to take inputs of different tickets for tutor hours and order the students accordingly. 

First I created a min heap that would 
<details><summary> Code for the min heap</summary>

```
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collection;

/**
 * Add your file header
 * Name: Josh Yang
 * ID: A16667394
 * Email: jwyang@ucsd.edu
 * Sources used: Zybooks, Lecture slides
 * 
 * This file contains MyMinHeap class. Consructs min heap and has
 * different methdos to remove, insertm and shift min heap around.
 */

// Import statements
import java.util.ArrayList;
import java.util.Collection;

/**
 * Implements min heap and the min heap interfact. Has public instance variable
 * which is an Arraylist which is the data structure for min heap ADT.
 */
public class MyMinHeap<E extends Comparable<E>> implements MinHeapInterface <E>{
    public ArrayList<E> data;

    public MyMinHeap() {
        this.data = new ArrayList<>();
    }

    public MyMinHeap(Collection<? extends E> collection) {
        if (collection == null || collection.contains(null)) {
            throw new NullPointerException();
        }
        this.data = new ArrayList<>(collection);
        for (int i = 0; i < this.data.size(); i++) {
            this.percolateDown(i);
            this.percolateUp(i);
        }
    }

    /**
     * swap the elements at from and to indicies in data
     * @param from int that  gives index of one of the elements to be swapped
     * @param to int that gives the second index of another element
     */
    protected void swap(int from, int to) {
        Object temp = this.data.get(from);
        this.data.set(from, this.data.get(to));
        this.data.set(to, (E) temp);
    }

    /**
     * Calculate and return parent index of the index given
     * @param index int that gives the index to find parent of
     * @return parent index
     */
    protected int getParentIdx(int index) {
        return (index - 1) / 2;
    }
    /**
     * Get the left child index of the given index
     * @param index int that gives index for which to find left child for
     * @return index of left child
     */
    protected int getLeftChildIdx(int index) {
         return (2 * index) + 1;
    }

    /**
     * Get the right child of given index
     * @param index int that gives index for which to find left child for 
     * @return index of right child
     */
    protected int getRightChildIdx(int index) {
         return (index * 2) + 2;
    }

    /**
     * Get the smaller child of given index, or left child if children are equal
     * @param index index for which to find the smaller child for
     * @return smaller child index
     */
    protected int getMinChildIdx(int index) {
        // check if children index are out of bounds
        if (this.getRightChildIdx(index) >= this.data.size() || 
            this.getLeftChildIdx(index) >= this.data.size()) {
                return -1;
        }

        // set vars left and right for their children
        E left = this.data.get(this.getLeftChildIdx(index));
        E right = this.data.get(this.getRightChildIdx(index));
        
        if (left.compareTo(right) <= 0) return this.getLeftChildIdx(index);
        else return this.getRightChildIdx(index);
        
    }

    /**
     * Percolate element at index up until no heap properties are violated by
     * the element. Do this through swapping. 
     * @param index int giving index of the element to be percolated
     */
    protected void percolateUp(int index) {
        while (index > 0) {
            int parentIndex = this.getParentIdx(index);
            if (this.data.get(index).compareTo(this.data.get(parentIndex)) 
                >= 0) {
                break;
            }
            else {
                this.swap(index, parentIndex);
                index = parentIndex;
            }
        }
    }

    /**
     * Percolate element at index down until no heap properties are violated by 
     * the element. Do this through swapping. DOne recursively.
     * @param index int giving the index of the element to be percolated
     */
    protected void percolateDown(int index) {
        int swapIndex = 0;
        // check for best case
        if (this.getMinChildIdx(index) > 0) { 
            swapIndex = this.getMinChildIdx(index);
            this.swap(index, swapIndex);
            this.percolateDown(swapIndex);
        }

    }

    /**
     * Remove and return element at index
     * @param index int giving index of element to be deleted
     * @return element that is deleted
     */
    protected E deleteIndex(int index) {
        E elem = this.data.get(index);
        // case when index is leaf
        // other cases
        int lastIndex = this.data.size() - 1;
        this.data.set(index, this.data.get(lastIndex));
        this.data.remove(this.data.size() -1);

        // check whether to use percolate up or down
        if (this.getLeftChildIdx(index) < lastIndex 
            && this.getRightChildIdx(index) < lastIndex) {
            if (this.data.get(this.getLeftChildIdx(index)).
                compareTo(this.data.get(index)) > 0 || 
                this.data.get(this.getRightChildIdx(index)).
                compareTo(this.data.get(index)) > 0) this.percolateUp(index);
            else this.percolateDown(index);
        }
        return elem;
    }

    /**
     * Insert given element to end of heap and then percolate up
     * @param element Object that will be insered
     */
    public void insert (E element) {
        if (element == null) throw new NullPointerException();
        this.data.add(element);
        this.percolateUp(this.data.size() - 1);
    }

    /**
     * Gets the smallest value/ the root value
     * @return the root
     */
    public E getMin() {
        if (this.data.size() == 0) return null;
        else return this.data.get(0);

    }

    /**
     * Removes the root, then replaces it with the last element. Then percolate
     * down
     * @return the former root
     */
    public E remove() {
        if (this.data.size() == 0) return null;
        else return this.deleteIndex(0);
    }

    /**
     * Gets the size of heap
     * @return the size of heap
     */
    public int size() {
        int result = 0;
        for (int i = 0; i < this.data.size(); i++) {
            if (this.data.get(i) != null) result++;
        }
        return result;
    }

    /**
     * Clears the heap. Size should be 0.
     */
    public void clear() {
        while (this.data.size() > 0) {
            this.deleteIndex(0);
        }
    }

}
```
</details>


Then I created a class called Ticket for the prioirty queue. A ticket would give the student's name and what they need help with.  
<details><summary>Code for the Ticket class</summary>

```
/**
 * Name: Joshua Yang
 * ID: A16667394
 * Email: jwyang@ucsd.edu
 * Sources used: None
 * 
 * This file has ticket class that also implements comaprable to compare the 
 * tickets for priority. 
 */

import java.util.HashMap;


/**
 * This class creates a Ticket object to be used as a 
 * node for a priority queue. Contains a static HashMap to maintain
 * the priority ordering.
 */
public class Ticket implements Comparable<Ticket>{

    
    public static final String ENVIRONMENT_SETUP = "Environment Setup";
    public static final String DEBUGGING = "Debgugging";
    public static final String CONCEPT_DOUBTS = "Conceptual Doubt";
    public static final String OTHERS = "Others";  
    
    public static final String WAITING = "Waiting";
    public static final String PROCESSING = "Accepted";
    public static final String RESOLVED = "Resolved";
    public static final String DATE_FORMAT = "HH:mm:ss";
    
    public static HashMap<String, Integer> orderMap;
    
    
    String studentName;
    String ticketType;
    
    String ticketStatus;
    
    Long createdAt;
    Long resolvedAt; 
    int ticketNumber; 
    
    /**
     * Constructor that initializes a Ticket with the name of the 
     * student that created it and type of the ticket
     * @param studentName Name of student that created the ticket
     * @param ticketType Type of the ticket
     */
    public Ticket(String studentName, String ticketType){
        this.studentName = studentName;
        this.ticketType = ticketType;
        this.ticketStatus = WAITING;
    }
    

    /**
     * Sets the studentName
     * @param studentName Name of student that created the ticket
     */
    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
    
    /**
     * Sets the ticket's status in the Queue
     * The status can be Waiting, Accepted, or Resolved.
     * @param ticketStatus Current status of the ticket in queue
     */
    public void setTicketStatus(String ticketStatus) {
        this.ticketStatus = ticketStatus;
    }

    /**
     * Sets the type of the ticket.
     * Type can be Environment setup, 
     * Debugging, Conceptual Doubt, or Others
     * @param ticketType Type of the ticket
     */
    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }

    /**
     * Sets the ticket number
     * @param ticketNumber Unique ID in order of creation
     */
    public void setTicketNumber(int ticketNumber){
        this.ticketNumber = ticketNumber;
    }
       
    /**
     * Sets the second at which the ticket was created.
     * @param createdAt Second at which ticket was created
     */
    public void setCreatedAt(Long createdAt){
        this.createdAt = createdAt;
    }

    /**
     * Sets the second at which the ticket was resolved.
     * @param resolvedAt Second at which ticket was resolved
     */
    public void setResolvedAt(Long resolvedAt){
        this.resolvedAt = resolvedAt;
    }

    /**
     * Returns name of student that created the ticket
     * @return Student name
     */
    public String getStudentName() {
        return studentName;
    }

    /**
     * Returns type of ticket
     * @return type of ticket
     */
    public String getTicketType() {
        return ticketType;
    }

    /**
     * Returns the time at which ticket was created
     * @return second at which ticket was created
     */
    public Long getCreatedAt() {
        return createdAt;
    }

    /**
     * Returns the status of the ticket in the queue
     * @return status of ticket
     */
    public String getTicketStatus() {
        return ticketStatus;
    }
      
    /**
     * Returns the ticket Number
     * @return Unique ID in the order it was created
     */
    public int getTicketNumber(){
        return ticketNumber;
    }
    
    /**
     * Returns time at which ticket was resolved.
     * @return seconds at which ticket was resolved
     */
    public Long getResolvedAt(){
        return resolvedAt;
    }
    
    /**
     * Sets the priority order
     * @param orderMap mapping of TicketType to priority order
     */
    public static void setOrderMap(HashMap<String, Integer> orderMap){
        Ticket.orderMap = orderMap;
    }
    
    /**
     * This method overrides the compareTo method. It compares the the current
     * ticket and the ticket other. It compares the ticket type and the created
     * at variables
     * @param other Ticket that gives the other ticket to compare to
     * @return negative number if current ticket comes before other
     * @return positive int if the current ticket comes after the other
     * @return 0 if both tickets are identical
     */
    @Override
    public int compareTo(Ticket other){
        // same type different createdAt
        if (orderMap.get(this.getTicketType())
            .compareTo(orderMap.get(other.getTicketType())) == 0) {
                return this.createdAt.compareTo(other.createdAt);
        } 
        
        // different ticket type
        else return orderMap.get(this.getTicketType()).
            compareTo(orderMap.get(other.getTicketType()));
    }
 
    
}```
</details>