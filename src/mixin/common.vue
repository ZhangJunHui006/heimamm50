<script>
export default {
  methods: {
    // 更改当前行的状态
    async changeStatus(url, id) {
      const res = await this.$axios.post(url, { id });
      if (res.data.code === 200) {
        this.$message({
          message: "更改状态成功~",
          type: "success"
        });
        // 重新查询
        this.search();
      }
    },
    deleteUser(url, id, username) {
      this.$confirm(`确定删除 ${username} 该用户吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post(url, { id });
          if (res.data.code === 200) {
            this.$message({
              message: "删除成功~",
              type: "success"
            });
            // 重新查询
            this.search();
          }
        })
        .catch(() => {});
    }
  }
};
</script>