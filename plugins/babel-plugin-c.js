
module.exports = (api, options) => {
    api.assertVersion(7);
    console.log('plugin-options-c', options)
  
    return {
      name: "transform-c",
      pre() {
        console.log('plugin-c-pre');
      },
      post() {
        console.log('plugin-c-post');
      },
      visitor: {
        Identifier(path) {
            if(path.node.name == 'a'){
                console.log('plugin-c-visitor');
                // path.node.name = 'c';
            }
        },
      }
    };
  };