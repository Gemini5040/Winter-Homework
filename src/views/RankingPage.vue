<template>
  <div class="ranking">
    <h1>用户排名</h1>
    <table>
      <thead>
        <tr>
          <th>排名</th>
          <th>用户名称</th>
          <th>已做题目数</th>
          <th>比赛分数</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>用户537</td>
          <td>99</td>
          <td>1314520</td>
        </tr>
        <tr>
          <td>2</td>
          <td>用户234</td>
          <td>88</td>
          <td>1200000</td>
        </tr>
        <tr>
          <td>3</td>
          <td>用户445</td>
          <td>75</td>
          <td>1100000</td>
        </tr>
        <!-- 其他排名数据可以继续添加 -->
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RankingPage',
}
</script>

<style scoped>
.ranking {
  max-width: 800px;
  margin: 50px auto;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}
</style>
