
module.exports = (api, options) => {
    api.assertVersion(7);
    console.log('plugin-options-d', options)
  
    return {
      name: "transform-d",
      pre() {
        console.log('plugin-d-pre');
      },
      post() {
        console.log('plugin-d-post');
      },
      visitor: {
        Identifier(path) {
            if(path.node.name == 'a'){
                console.log('plugin-d-visitor');
            }
        },
      }
    };
  };