# Tutor Hour Ticket Project

## In this project I crerated  a priority queue that would be able to take inputs of different tickets for tutor hours and order the students accordingly. 

### First I created a min heap that would be used to implement a priority queue for the waitlist.
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


### Then I created a class called Ticket for the prioirty queue. A ticket would give the student's name and what they need help with.  

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
 
    
}
```
</details>

### Third, I utilized the prioirty queue to create a waitlist for students that show up to tutor hours online.
<details><summary> Code for the prioirty queue</summary>

```
/**
 * Simulation of Autograder Ticket System. 
 * Used for PA7 Part 2 in CSE 12
 */
import java.awt.GridLayout;
import java.util.ArrayList;
import java.util.Date;
import java.util.Stack;
import javax.swing.*;
import javax.swing.Timer;
import java.awt.*;  
import java.awt.event.*;
import java.util.HashMap;
import javax.swing.border.BevelBorder;

/**
 * Represents the Autograder Ticket System with a Ticket Priority Queue,
 * Resolved Tickets stack and other Queue Statistics
 */
public class Autograder extends javax.swing.JFrame {

    public static final int BUSY = 1;
    public static final int AVAILABLE = 0;
    public static final int ADD_TICKET_DELAY = 4000;
    public static final int PROCESS_TICKET_DELAY = 7000;
    public static final int REMOVE_TICKET_DELAY = 13000;
    public static final int UPDATE_STATISTICS_DELAY = 3000;
    public static final int UPDATE_CLOCK_DELAY = 1000;
    public static final String DATE_FORMAT = "HH:mm:ss";
    public static final String TICKETS_RESOLVED_MESSAGE 
            = "Tickets Resolved: %o";
    public static final String STUDENT_NAME_LABEL = "Student Name: %s";
    public static final String STATUS_LABEL = "Status: %s";
    public static final String TYPE_LABEL = "Type: %s";
    public static final String TICKET_NUMBER_LABEL = "Ticket Number: %o";
    public static final String TICKET_CREATED_AT_LABEL = 
            "Created at: %o s";
    public static final String TICKET_RESOLVED_AT_LABEL = 
            "Resolved at: %o s";
    public static final long SECONDS_CONVERSION = 1000;
    public static final String SECONDS_UNIT = "%o s";
    
    public static final int FIRST_PRIORITY = 1;
    public static final int SECOND_PRIORITY = 2;
    public static final int THIRD_PRIORITY = 3;
    public static final int FOURTH_PRIORITY = 4;
    


    MyPriorityQueue<Ticket> ticketQueue;    
    
    
    ArrayList<Ticket> tickets;
    Stack<Ticket> historyStack;
    Ticket currTicket;
    public int status;
    public int ticketNumber = 0;
    public int ticketsResolved = 0;
    public Long seconds;
    Timer clockTime;
    
 
    public Autograder(){
        initComponents();
        ticketQueue = new MyPriorityQueue<>();
        tickets = new ArrayList<>();
        historyStack = new Stack<>();
        seconds = Long.valueOf("0");
        createTicketsList();
        startClock();
        makeQueuePanels();
        setTicketTypePriority();
               
    }
    
    
    //TODO: Play around with different priorities for different ticket types
    public void setTicketTypePriority(){
        HashMap<String, Integer> orderMap = new HashMap<>();
        orderMap.put(Ticket.ENVIRONMENT_SETUP, Autograder.FIRST_PRIORITY);
        orderMap.put(Ticket.DEBUGGING, Autograder.SECOND_PRIORITY);
        orderMap.put(Ticket.CONCEPT_DOUBTS, Autograder.THIRD_PRIORITY);
        orderMap.put(Ticket.OTHERS, Autograder.FOURTH_PRIORITY);
        Ticket.setOrderMap(orderMap);
    }
    
    
    private void startClock(){
        clockTime = new Timer(Autograder.UPDATE_CLOCK_DELAY, updateClockAction);
        clockTime.start(); 
    }
    protected void makeQueuePanels() {
        ticketPanel.setMaximumSize(new java.awt.Dimension(340,417));
        ticketPanel.setPreferredSize(new java.awt.Dimension(340,417));
        ticketPanel.setLayout(new BoxLayout(ticketPanel, BoxLayout.Y_AXIS));
        resolvedTicketsPanel.setMaximumSize(new java.awt.Dimension(340,417));
        resolvedTicketsPanel.setPreferredSize(new java.awt.Dimension(340,417));
        resolvedTicketsPanel.setLayout(new BoxLayout(resolvedTicketsPanel,
                BoxLayout.Y_AXIS));
    }
    
    
    ActionListener updateClockAction = new ActionListener() {
        public void actionPerformed(ActionEvent e) {
            clockTimeLabel.setText(String
                    .format(Autograder.SECONDS_UNIT, ++seconds));             
        }
    };
    
    ActionListener processTicketsAction = new ActionListener() {
        public void actionPerformed(ActionEvent e) {            
            if(status == Autograder.AVAILABLE && ticketQueue.getLength()>0){
                currTicket = ticketQueue.pop();
                currTicket.setTicketStatus(Ticket.PROCESSING);
                status = Autograder.BUSY;
                printQueue();
            }
            
        }
    };
    
    ActionListener removeTicketsAction = new ActionListener() {
        public void actionPerformed(ActionEvent e) {
            
            if(status == Autograder.BUSY){
                Ticket resolvedTicket = currTicket;
                currTicket = null;
                resolvedTicket.setTicketStatus(Ticket.RESOLVED);
                resolvedTicket.setResolvedAt(seconds);
                historyStack.push(resolvedTicket);
                
                ticketsResolvedLabel.setText(String
                        .format(Autograder.TICKETS_RESOLVED_MESSAGE, 
                                ++ticketsResolved));
            }
            status = Autograder.AVAILABLE;
            printQueue();
            printResolvedTickets();
            
        }
    };
    
    ActionListener addTicketsAction = new ActionListener() {
        public void actionPerformed(ActionEvent e) {
                if(ticketNumber<tickets.size()){
                    Ticket currTicket = tickets.get(ticketNumber);
                    currTicket.setCreatedAt(seconds);
                    currTicket.setTicketNumber(ticketNumber+1);
                    ticketQueue.push(currTicket);
                    ticketNumber++;
                    printQueue();
                    
                }
            
            
        }
    };
    
    //Do not change these
    private void createTicketsList(){
        this.tickets.add(new Ticket("Eman", Ticket.ENVIRONMENT_SETUP));
        this.tickets.add(new Ticket("Bill", Ticket.DEBUGGING));
        this.tickets.add(new Ticket("Sanjana", Ticket.OTHERS));
        this.tickets.add(new Ticket("Jeff", Ticket.CONCEPT_DOUBTS));
        this.tickets.add(new Ticket("Andrew", Ticket.ENVIRONMENT_SETUP));

    }
    
    private void printQueue(){
        ticketsInQueueLabel.setText("Tickets in Queue: " 
                + ticketQueue.getLength());
        ticketPanel.removeAll();
        if(status == Autograder.BUSY){
            ticketPanel.add(createTicketPanel(currTicket));
            ticketsInQueueLabel.setText("Tickets in Queue: " 
                    + (ticketQueue.getLength()+1));
        }
        for(int i=0; i<ticketQueue.heap.size(); i++){
            Ticket ticket = ticketQueue.heap.data.get(i);
            if(!ticket.getTicketStatus().equals(Ticket.PROCESSING)){
                
            }
            ticketPanel.add(createTicketPanel(ticket));
            
            setVisible(true);
        }
        System.out.println();
        ticketPanel.repaint();
    }
    
    
      private void printResolvedTickets(){
        resolvedTicketsPanel.removeAll();
        for(int i=historyStack.size()-1; i>=0; i--){
            Ticket ticket = historyStack.get(i);
            resolvedTicketsPanel.add(createResolvedTicketPanel(ticket));
            setVisible(true);
        }
        resolvedTicketsPanel.repaint();
    }
    
    
    
    private JPanel createTicketPanel(Ticket ticket){
        JPanel currTicketPanel = new JPanel();
        currTicketPanel.setLayout(new GridLayout(2,2));
        JLabel studentName = new JLabel(String.format(Autograder
                .STUDENT_NAME_LABEL,ticket.getStudentName()));
        JLabel ticketStatus = new JLabel(String.format(Autograder
                .STATUS_LABEL, ticket.getTicketStatus())); 
        JLabel ticketType = new JLabel(String.format(Autograder
                .TYPE_LABEL, ticket.getTicketType())); 
        JLabel ticketCreatedNumber = new JLabel(String.format(Autograder
                .TICKET_NUMBER_LABEL, ticket.getTicketNumber()));
        
        
        currTicketPanel.add(ticketCreatedNumber);
        currTicketPanel.add(ticketStatus);
        currTicketPanel.add(ticketType);
        currTicketPanel.add(studentName);
        currTicketPanel.setBorder(javax.swing.BorderFactory
                .createSoftBevelBorder(BevelBorder.RAISED, 
                        Color.lightGray, Color.darkGray));
        
        currTicketPanel.setPreferredSize(new java.awt.Dimension(340,80));
        currTicketPanel.setMaximumSize(new java.awt.Dimension(340,80));
        currTicketPanel.setMinimumSize(new java.awt.Dimension(340,80));
        
        setPanelColor(currTicketPanel, ticket);
        return currTicketPanel;
    }
    
    private JPanel createResolvedTicketPanel(Ticket ticket){
        if(ticket == null){
            return null;
        }
        JPanel currTicketPanel = new JPanel();
        currTicketPanel.setLayout(new GridLayout(3,2));
        JLabel studentName = new JLabel(String.format(Autograder
                .STUDENT_NAME_LABEL,ticket.getStudentName()));
        JLabel ticketStatus = new JLabel(String.format(Autograder
                .STATUS_LABEL, ticket.getTicketStatus())); 
        JLabel ticketType = new JLabel(String.format(Autograder
                .TYPE_LABEL, ticket.getTicketType())); 
        
        
        JLabel ticketCreated = new JLabel(String
                .format(Autograder.TICKET_CREATED_AT_LABEL, 
                    ticket.getCreatedAt()));
        
        JLabel ticketCreatedNumber = new JLabel(String.format(Autograder
                .TICKET_NUMBER_LABEL, ticket.getTicketNumber()));
        
        JLabel ticketResolved = new JLabel(String
                .format(Autograder.TICKET_RESOLVED_AT_LABEL, 
                ticket.getResolvedAt()));
        
        
        currTicketPanel.add(ticketCreatedNumber);
        currTicketPanel.add(ticketStatus);
        currTicketPanel.add(ticketType);
        currTicketPanel.add(studentName);
        currTicketPanel.add(ticketCreated);
        currTicketPanel.add(ticketResolved);
        currTicketPanel.setBorder(javax.swing.BorderFactory
                .createSoftBevelBorder(BevelBorder.RAISED, 
                        Color.lightGray, Color.GRAY));
        
        currTicketPanel.setPreferredSize(new java.awt.Dimension(340,80));
        currTicketPanel.setMaximumSize(new java.awt.Dimension(340,80));
        currTicketPanel.setMinimumSize(new java.awt.Dimension(340,80));
        
        setPanelColor(currTicketPanel, ticket);
        return currTicketPanel;
    }
    
    
    
    private void setPanelColor(JPanel ticketPanel, Ticket ticket){
        String ticket_type = ticket.getTicketType();
        if(ticket_type.equals(Ticket.ENVIRONMENT_SETUP)){
            ticketPanel.setBackground(new Color(235, 64, 52, 60));
        }
        else if(ticket_type.equals(Ticket.DEBUGGING)){
            ticketPanel.setBackground(new Color(235, 153, 52,60));
        }
        else if(ticket_type.equals(Ticket.CONCEPT_DOUBTS)){
            ticketPanel.setBackground(new Color(235, 226, 52,60));
        }
        else{
            ticketPanel.setBackground(new Color(201, 235, 52,60));
        }
    }
    
     ActionListener updateStatistics = new ActionListener() {
        public void actionPerformed(ActionEvent e) {
            
            
        
            if(ticketQueue.getLength()<=0){
                return;
            }    
            long sumEnvironmentWaitTime = 0;
            long sumDebuggingWaitTime = 0;
            long sumConceptWaitTime = 0;
            long sumOthersWaitTime = 0;
            int numESTickets = 0;
            int numDebugTickets = 0;
            int numConceptTickets = 0;
            int numOthersTickets = 0;
            for(int i=0; i<ticketQueue.heap.size(); i++){
                Ticket ticket = ticketQueue.heap.data.get(i);
                if(ticket.ticketStatus.equals(Ticket.WAITING)){
                    long diff = Math.abs(seconds - 
                            ticket.getCreatedAt());
                    if(ticket.ticketType.equals(Ticket.ENVIRONMENT_SETUP)){
                        sumEnvironmentWaitTime += diff;
                        numESTickets++;
                    }
                    if(ticket.ticketType.equals(Ticket.DEBUGGING)){
                        sumDebuggingWaitTime += diff;
                        numDebugTickets++;
                    }
                    if(ticket.ticketType.equals(Ticket.CONCEPT_DOUBTS)){
                        sumConceptWaitTime += diff;
                        numConceptTickets++;
                    }
                    if(ticket.ticketType.equals(Ticket.OTHERS)){
                        sumOthersWaitTime += diff;
                        numOthersTickets++;
                    }

                }
            }

            if(numESTickets>0){
                ESTimeLabel.setText(String
                        .format(Autograder.SECONDS_UNIT,
                                sumEnvironmentWaitTime/numESTickets));
            }
            if(numDebugTickets>0){
                DebugTimeLabel.setText(String.format(Autograder.SECONDS_UNIT,
                        sumDebuggingWaitTime/numDebugTickets));
            }
            if(numConceptTickets>0){
                ConceptTimeLabel.setText(String.format(Autograder.SECONDS_UNIT,
                        sumConceptWaitTime/numConceptTickets));
            }
            if(numOthersTickets>0){
                OthersTimeLabel.setText(String.format(Autograder.SECONDS_UNIT,
                        sumOthersWaitTime/numOthersTickets)); 
            }     

            repaint();

        }
        
    };


    private void startButtonActionPerformed(java.awt.event.ActionEvent evt) {                                            
        startButton.setEnabled(false);
        Timer addTicketTimer = 
                new Timer(Autograder.ADD_TICKET_DELAY, addTicketsAction);
        Timer processTicketTimer = 
                new Timer(Autograder.PROCESS_TICKET_DELAY,
                        processTicketsAction); 
        Timer removeTicketTimer = 
                new Timer(Autograder.REMOVE_TICKET_DELAY, removeTicketsAction);
        Timer updateStats = 
                new Timer(Autograder.UPDATE_STATISTICS_DELAY, updateStatistics);
        updateStats.start();
        addTicketTimer.start();
        processTicketTimer.start();
        removeTicketTimer.start();

    }                                           

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {         
                Autograder ag = new Autograder();
                ag.setVisible(true);               
                                
            }
        });
    } 
    


    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">                          
    private void initComponents() {

        analyticsPanel = new javax.swing.JPanel();
        ESLabel = new javax.swing.JLabel();
        debuggingLabel = new javax.swing.JLabel();
        conceptLabel = new javax.swing.JLabel();
        othersLabel = new javax.swing.JLabel();
        AvgWaitTime = new javax.swing.JLabel();
        ESWaitTime = new javax.swing.JLabel();
        DebugWaitTime = new javax.swing.JLabel();
        ConceptWaitTime = new javax.swing.JLabel();
        OthersWaitTime = new javax.swing.JLabel();
        resolvedTicketsPanel = new javax.swing.JPanel();
        resolvedTicketsTitle = new javax.swing.JLabel();
        ticketsResolvedLabel = new javax.swing.JLabel();
        ticketsInQueueLabel = new javax.swing.JLabel();
        estimatedWaitTimeTitle = new javax.swing.JLabel();
        ESTimeLabel = new javax.swing.JLabel();
        DebugTimeLabel = new javax.swing.JLabel();
        ConceptTimeLabel = new javax.swing.JLabel();
        OthersTimeLabel = new javax.swing.JLabel();
        autograderSimulationLabel = new javax.swing.JLabel();
        startButton = new javax.swing.JButton();
        timeLabel = new javax.swing.JLabel();
        ticketPanel = new javax.swing.JPanel();
        ticketQueueTitle = new javax.swing.JLabel();
        clockTimeLabel = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setTitle("Autograder Simulation");
        setBackground(new java.awt.Color(255, 255, 255));
        setForeground(java.awt.Color.white);
        setResizable(false);

        ESLabel.setFont(
            new java.awt.Font("Lucida Sans Typewriter", 1, 11)); // NOI18N
        ESLabel.setForeground(new java.awt.Color(51, 51, 51));
        ESLabel.setText("Environment setup: ");

        debuggingLabel.setFont(
            new java.awt.Font("Lucida Sans Typewriter", 1, 11)); // NOI18N
        debuggingLabel.setForeground(new java.awt.Color(51, 51, 51));
        debuggingLabel.setText("Debugging:");

        conceptLabel.setFont(
            new java.awt.Font("Lucida Sans Typewriter", 1, 11)); // NOI18N
        conceptLabel.setForeground(new java.awt.Color(51, 51, 51));
        conceptLabel.setText("Conceptual:");

        othersLabel.setFont(
            new java.awt.Font("Lucida Sans Typewriter", 1, 11)); // NOI18N
        othersLabel.setForeground(new java.awt.Color(51, 51, 51));
        othersLabel.setText("Others:");

        resolvedTicketsPanel.setBackground(new java.awt.Color(255, 255, 255));
        resolvedTicketsPanel.setBorder(
            javax.swing.BorderFactory
            .createBevelBorder(javax.swing.border.BevelBorder.LOWERED));

        javax.swing.GroupLayout resolvedTicketsPanelLayout 
        = new javax.swing.GroupLayout(resolvedTicketsPanel);
        resolvedTicketsPanel.setLayout(resolvedTicketsPanelLayout);
        resolvedTicketsPanelLayout.setHorizontalGroup(
            resolvedTicketsPanelLayout
            .createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 340, Short.MAX_VALUE)
        );
        resolvedTicketsPanelLayout.setVerticalGroup(
            resolvedTicketsPanelLayout
            .createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 414, Short.MAX_VALUE)
        );

        resolvedTicketsTitle.setFont(
            new java.awt.Font("Lucida Sans Typewriter", 1, 14)); // NOI18N
        resolvedTicketsTitle.setForeground(new java.awt.Color(51, 51, 51));
        resolvedTicketsTitle.setHorizontalAlignment(
            javax.swing.SwingConstants.CENTER);
        resolvedTicketsTitle.setText("Resolved Tickets");

        ticketsResolvedLabel.setFont(
            new java.awt.Font("Lucida Sans Typewriter", 1, 12)); // NOI18N
        ticketsResolvedLabel.setForeground(new java.awt.Color(51, 51, 51));
        ticketsResolvedLabel.setText("Tickets Resolved:");

        ticketsInQueueLabel.setFont(
            new java.awt.Font("Lucida Sans Typewriter", 1, 12)); // NOI18N
        ticketsInQueueLabel.setForeground(new java.awt.Color(51, 51, 51));
        ticketsInQueueLabel.setText("Tickets in Queue:");

        estimatedWaitTimeTitle.setFont(
            new java.awt.Font("Lucida Sans Typewriter", 1, 12)); // NOI18N
        estimatedWaitTimeTitle.setForeground(new java.awt.Color(51, 51, 51));
        estimatedWaitTimeTitle.setText("Estimated Wait Times (in seconds)");

        ESTimeLabel.setFont(
            new java.awt.Font("Lucida Sans Typewriter", 2, 11)); // NOI18N
        ESTimeLabel.setForeground(new java.awt.Color(51, 51, 51));
        ESTimeLabel.setText("0 s");

        DebugTimeLabel.setFont(
            new java.awt.Font("Lucida Sans Typewriter", 2, 11)); // NOI18N
        DebugTimeLabel.setForeground(new java.awt.Color(51, 51, 51));
        DebugTimeLabel.setText("0 s");

        ConceptTimeLabel.setFont(
            new java.awt.Font("Lucida Sans Typewriter", 2, 11)); // NOI18N
        ConceptTimeLabel.setForeground(new java.awt.Color(51, 51, 51));
        ConceptTimeLabel.setText("0 s");

        OthersTimeLabel.setFont(
            new java.awt.Font("Lucida Sans Typewriter", 2, 11)); // NOI18N
        OthersTimeLabel.setForeground(new java.awt.Color(51, 51, 51));
        OthersTimeLabel.setText("0 s");

        javax.swing.GroupLayout analyticsPanelLayout = 
        new javax.swing.GroupLayout(analyticsPanel);
        analyticsPanel.setLayout(analyticsPanelLayout);
        analyticsPanelLayout.setHorizontalGroup(
            analyticsPanelLayout.createParallelGroup(
                javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(analyticsPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(resolvedTicketsPanel, 
                javax.swing.GroupLayout.PREFERRED_SIZE,
                 javax.swing.GroupLayout.DEFAULT_SIZE, 
                 javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGroup(analyticsPanelLayout
                .createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(analyticsPanelLayout.createSequentialGroup()
                        .addGap(343, 343, 343)
                        .addComponent(OthersWaitTime))
                    .addGroup(analyticsPanelLayout.createSequentialGroup()
                        .addGap(415, 415, 415)
                        .addComponent(ConceptWaitTime))
                    .addGroup(analyticsPanelLayout.createSequentialGroup()
                        .addGap(361, 361, 361)
                        .addComponent(DebugWaitTime))
                    .addGroup(analyticsPanelLayout.createSequentialGroup()
                        .addGap(403, 403, 403)
                        .addComponent(ESWaitTime))
                    .addGroup(analyticsPanelLayout.createSequentialGroup()
                        .addGap(45, 45, 45)
                        .addGroup(analyticsPanelLayout
                        .createParallelGroup(javax
                        .swing.GroupLayout.Alignment.LEADING)
                            .addComponent(ticketsResolvedLabel)
                            .addComponent(ticketsInQueueLabel)
                            .addGroup(analyticsPanelLayout
                            .createSequentialGroup()
                                .addGroup(analyticsPanelLayout
                                .createParallelGroup(javax.swing
                                .GroupLayout.Alignment.LEADING)
                                    .addGroup(javax.swing.GroupLayout.Alignment
                                    .TRAILING, analyticsPanelLayout
                                    .createSequentialGroup()
                                        .addComponent(ESLabel)
                                        .addGap(18, 18, 18))
                                    .addGroup(javax.swing.GroupLayout
                                    .Alignment.TRAILING, analyticsPanelLayout
                                    .createSequentialGroup()
                                        .addGroup(analyticsPanelLayout
                                        .createParallelGroup(javax.swing
                                        .GroupLayout.Alignment.TRAILING)
                                            .addComponent(debuggingLabel)
                                            .addComponent(conceptLabel)
                                            .addComponent(othersLabel))
                                        .addGap(26, 26, 26)))
                                .addGroup(analyticsPanelLayout
                                .createParallelGroup(javax.swing.GroupLayout
                                .Alignment.LEADING)
                                    .addComponent(OthersTimeLabel)
                                    .addComponent(DebugTimeLabel)
                                    .addComponent(ConceptTimeLabel)
                                    .addComponent(ESTimeLabel)))))
                    .addGroup(analyticsPanelLayout.createSequentialGroup()
                        .addGap(293, 293, 293)
                        .addComponent(AvgWaitTime))
                    .addGroup(analyticsPanelLayout.createSequentialGroup()
                        .addGap(35, 35, 35)
                        .addComponent(estimatedWaitTimeTitle))))
            .addGroup(analyticsPanelLayout.createSequentialGroup()
                .addGap(115, 115, 115)
                .addComponent(resolvedTicketsTitle))
        );
        analyticsPanelLayout.setVerticalGroup(
            analyticsPanelLayout.createParallelGroup(
                javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(analyticsPanelLayout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE,
                 Short.MAX_VALUE)
                .addComponent(ticketsInQueueLabel)
                .addGap(18, 18, 18)
                .addComponent(ticketsResolvedLabel)
                .addGap(12, 12, 12)
                .addComponent(AvgWaitTime)
                .addGap(47, 47, 47)
                .addComponent(ESWaitTime)
                .addGap(42, 42, 42)
                .addComponent(estimatedWaitTimeTitle)
                .addGap(18, 18, 18)
                .addComponent(DebugWaitTime)
                .addGap(14, 14, 14)
                .addGroup(analyticsPanelLayout.createParallelGroup(
                    javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(ESLabel)
                    .addComponent(ESTimeLabel))
                .addGap(16, 16, 16)
                .addComponent(ConceptWaitTime)
                .addGap(14, 14, 14)
                .addGroup(analyticsPanelLayout.createParallelGroup(
                    javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(debuggingLabel)
                    .addComponent(DebugTimeLabel))
                .addGap(15, 15, 15)
                .addComponent(OthersWaitTime)
                .addGap(15, 15, 15)
                .addGroup(analyticsPanelLayout.createParallelGroup(
                    javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(conceptLabel)
                    .addComponent(ConceptTimeLabel))
                .addGap(31, 31, 31)
                .addGroup(analyticsPanelLayout.createParallelGroup(
                    javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(othersLabel)
                    .addComponent(OthersTimeLabel))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, 
                Short.MAX_VALUE))
            .addGroup(analyticsPanelLayout.createSequentialGroup()
                .addContainerGap(33, Short.MAX_VALUE)
                .addComponent(resolvedTicketsTitle, 
                javax.swing.GroupLayout.PREFERRED_SIZE, 22,
                 javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle
                .ComponentPlacement.RELATED)
                .addComponent(resolvedTicketsPanel,
                 javax.swing.GroupLayout.PREFERRED_SIZE, 
                 javax.swing.GroupLayout.DEFAULT_SIZE, 
                 javax.swing.GroupLayout.PREFERRED_SIZE))
        );

        autograderSimulationLabel.setFont(new java.awt.Font(
            "Lucida Sans Typewriter", 1, 18)); // NOI18N
        autograderSimulationLabel.setForeground(new java.awt.Color(
            51, 51, 51));
        autograderSimulationLabel.setHorizontalAlignment(javax.swing
        .SwingConstants.CENTER);
        autograderSimulationLabel.setText("Autograder Simulation");

        startButton.setFont(new java.awt.Font("Lucida Sans Typewriter"
        , 1, 14)); // NOI18N
        startButton.setForeground(new java.awt.Color(51, 51, 51));
        startButton.setText("Start");
        startButton.setBorder(javax.swing.BorderFactory.createBevelBorder(
            javax.swing.border.BevelBorder.RAISED));
        startButton.setFocusPainted(false);
        startButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                startButtonActionPerformed(evt);
            }
        });

        timeLabel.setFont(new java.awt.Font("Lucida Sans Typewriter", 
        1, 11)); // NOI18N
        timeLabel.setForeground(new java.awt.Color(102, 102, 102));
        timeLabel.setText("Time:");

        ticketPanel.setBackground(new java.awt.Color(255, 255, 255));
        ticketPanel.setBorder(javax.swing.BorderFactory.createBevelBorder(
            javax.swing.border.BevelBorder.LOWERED));

        javax.swing.GroupLayout ticketPanelLayout = new javax
        .swing.GroupLayout(ticketPanel);
        ticketPanel.setLayout(ticketPanelLayout);
        ticketPanelLayout.setHorizontalGroup(
            ticketPanelLayout.createParallelGroup(javax
            .swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 340, Short.MAX_VALUE)
        );
        ticketPanelLayout.setVerticalGroup(
            ticketPanelLayout.createParallelGroup(javax
            .swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 417, Short.MAX_VALUE)
        );

        ticketQueueTitle.setFont(new java.awt.Font("Lucida Sans Typewriter",
         1, 14)); // NOI18N
        ticketQueueTitle.setForeground(new java.awt.Color(51, 51, 51));
        ticketQueueTitle.setText("Ticket Queue");

        javax.swing.GroupLayout layout = new javax.swing
        .GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing
            .GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment
            .TRAILING, layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax
                .swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(layout.createSequentialGroup()
                        .addGap(324, 324, 324)
                        .addComponent(autograderSimulationLabel)
                        .addGap(18, 18, 18)
                        .addComponent(startButton, 
                        javax.swing.GroupLayout.PREFERRED_SIZE,
                         58, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing
                        .LayoutStyle.ComponentPlacement.RELATED, 
                        javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(timeLabel)
                        .addPreferredGap(javax.swing
                        .LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(clockTimeLabel, 
                        javax.swing.GroupLayout.PREFERRED_SIZE, 
                        78, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(20, 20, 20))
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax
                        .swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addGap(42, 42, 42)
                                .addComponent(ticketPanel,
                                 javax.swing.GroupLayout.PREFERRED_SIZE,
                                  javax.swing.GroupLayout.DEFAULT_SIZE, 
                                  javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(layout.createSequentialGroup()
                                .addGap(146, 146, 146)
                                .addComponent(ticketQueueTitle)))
                        .addPreferredGap(javax.swing.LayoutStyle
                        .ComponentPlacement.RELATED, 
                        14, Short.MAX_VALUE)
                        .addComponent(analyticsPanel,
                         javax.swing.GroupLayout.PREFERRED_SIZE,
                          659, 
                          javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addGap(30, 30, 30))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing
            .GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout
            .Alignment.TRAILING, layout.createSequentialGroup()
                .addGap(43, 43, 43)
                .addGroup(layout.createParallelGroup(javax
                .swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(autograderSimulationLabel, 
                    javax.swing.GroupLayout.DEFAULT_SIZE, 
                    javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(startButton, 
                    javax.swing.GroupLayout.PREFERRED_SIZE, 
                    29, 
                    javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(timeLabel)
                    .addComponent(clockTimeLabel))
                .addGap(24, 24, 24)
                .addGroup(layout.createParallelGroup(javax
                .swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(ticketQueueTitle)
                        .addGap(11, 11, 11)
                        .addComponent(ticketPanel, 
                        javax.swing.GroupLayout.PREFERRED_SIZE, 
                        javax.swing.GroupLayout.DEFAULT_SIZE, 
                        javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(analyticsPanel, 
                    javax.swing.GroupLayout.PREFERRED_SIZE, 
                    javax.swing.GroupLayout.DEFAULT_SIZE, 
                    javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(40, 40, 40))
        );

        pack();
    }// </editor-fold>                        

    
    

    // Variables declaration - do not modify                     
    private javax.swing.JLabel AvgWaitTime;
    private javax.swing.JLabel ConceptTimeLabel;
    private javax.swing.JLabel ConceptWaitTime;
    private javax.swing.JLabel DebugTimeLabel;
    private javax.swing.JLabel DebugWaitTime;
    private javax.swing.JLabel ESLabel;
    private javax.swing.JLabel ESTimeLabel;
    private javax.swing.JLabel ESWaitTime;
    private javax.swing.JLabel OthersTimeLabel;
    private javax.swing.JLabel OthersWaitTime;
    private javax.swing.JPanel analyticsPanel;
    private javax.swing.JLabel autograderSimulationLabel;
    private javax.swing.JLabel clockTimeLabel;
    private javax.swing.JLabel conceptLabel;
    private javax.swing.JLabel debuggingLabel;
    private javax.swing.JLabel estimatedWaitTimeTitle;
    private javax.swing.JLabel othersLabel;
    private javax.swing.JPanel resolvedTicketsPanel;
    private javax.swing.JLabel resolvedTicketsTitle;
    private javax.swing.JButton startButton;
    private javax.swing.JPanel ticketPanel;
    private javax.swing.JLabel ticketQueueTitle;
    private javax.swing.JLabel ticketsInQueueLabel;
    private javax.swing.JLabel ticketsResolvedLabel;
    private javax.swing.JLabel timeLabel;
    // End of variables declaration                   
}
```
</details>