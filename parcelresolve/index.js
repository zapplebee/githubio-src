const { Resolver } = require("@parcel/plugin");
const path = require("path");
module.exports = new Resolver({
  async resolve(props) {
    if (props.specifier.startsWith("~")) {
      const potentialFile = path.join(
        process.cwd(),
        "_client",
        props.specifier.replace("~", "")
      );
      try {
        const filePath = require.resolve(potentialFile);
        return {
          filePath,
        };
      } catch (err) {}
    }
    return null;
  },
});
