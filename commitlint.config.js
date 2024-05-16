module.exports = {
  extends: ["./node_modules/@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["chore", "docs", "feat", "fix", "refactor", "revert", "test"]],
    "scope-enum": [
      2,
      "always",
      [
        "global",
        "ava",
        "ava/advisor",
        "ava/ckb",
        "ava/data",
        "ava/insight",
        "ava/ntv",
        "ava-react",
        "ava-react/ntv",
        "ava-react/insight-card",
      ],
    ],
  },
}
