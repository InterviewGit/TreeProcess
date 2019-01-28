# TreeProcess

### Run project:

1. Download and install docker for mac.
2. Go to the project folder and run `docker-compose up --build`
3. localhost:3000 is the webpage to view.
4. In case of any issue, run `docker-compose down` followed by `docker-compose up --build`
5. Sample username: `winfredjames@hotmail.com` password:`jj`

### Run Test case:

1. run `npm install` under project folder.
2. `npm test` to run the testcase.

### In case of Bigger Tree:

 In this solution, my solution will not scale easily for very Big Tree. Proposed solution for Trees that 
 doesn't fit in a memory are
 1. Getting the input in csv file and store it in database.
 2. Store the information in database in the following format
<table>
  <tbody>
    <tr>
      <th>UID</th>
      <th align="center">FromNode</th>
      <th align="right">ToNode</th>
      <th align="right">Height</th>
      <th align="right">Sum</th>
    </tr>
    <tr>
      <td>23u9flbjs</td>
      <td align="center">0</td>
      <td align="right">1</td>
      <td align="right">1</td>
      <td align="right">2</td>
    </tr>
    <tr>
      <td>iuqewrer2</td>
      <td align="center">2</td>
      <td align="right">1</td>
      <td align="right">2</td>
      <td align="right">3</td>
    </tr>
    <tr>
      <td>9u8fbhdde</td>
      <td align="center">1</td>
      <td align="right">2</td>
      <td align="right">2</td>
      <td align="right">4</td>
    </tr>
  </tbody>
</table>

  3. Since the table values are stored in preorder manner, the algorithm works by scanning/loading in batch from top to bottom from database(DISK). 
  4. The coded algorithm from this project is run over the `batch-of-data` and following values are collected in `height` and `sum` column respectively.
Algorithm continues with the next batch. Since we are storing height and sum for all nodes, this helps in finding the next node height and sum from prev batch. This memoization helps us to seperate the data into chunks and run independently. This help us scale our project for bigger input.
