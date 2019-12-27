
module.exports = (api, options) => {
    api.assertVersion(7);
    console.log('plugin-options-a', options)
  
    return {
      name: "transform-a",
      pre() {
        console.log('plugin-a-pre');
      },
      post() {
        console.log('plugin-a-post');
      },
      visitor: {
        Identifier(path) {
            if(path.node.name == 'a'){
                console.log('plugin-a-visitor');
            }
        },
      }
    };
  };