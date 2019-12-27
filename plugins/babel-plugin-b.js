
module.exports = (api, options) => {
    api.assertVersion(7);
    console.log('plugin-options-b', options)
  
    return {
      name: "transform-b",
      pre() {
        console.log('plugin-b-pre');
      },
      post() {
        console.log('plugin-b-post');
      },
      visitor: {
        Identifier(path) {
          if(path.node.name == 'a'){
            console.log('plugin-b-visitor');
        }
        },
      }
    };
  };