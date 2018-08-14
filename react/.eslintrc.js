module.exports = {
    "env": {
      "amd": true,
      "browser": true,
      "jest": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
    ],
    "rules": {
        // // enable additional rules

        // // "react/jsx-uses-react": "error",
        // // "react/jsx-uses-vars": "error",
        // "react/prop-types": "off",
        // "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
        // "padded-blocks": ["error", "never"],
        // "semi": ["error", "never"],

        // "import/no-unresolved": [
        //    2,
        //    { caseSensitive: false }
        // ]
    },
    "plugins": [
      "react",
      "import"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 7,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "globals": {
      "localStorage": true,
      "process": true
    },
    // {
    //   "settings": {
    //     "react": {
    //       "createClass": "createReactClass", // Regex for Component Factory to use,
    //                                          // default to "createReactClass"
    //       "pragma": "React",  // Pragma to use, default to "React"
    //       "version": "15.0", // React version, default to the latest React stable release
    //       "flowVersion": "0.53" // Flow version
    //     },
    //     "propWrapperFunctions": [ "forbidExtraProps" ] // The names of any functions used to wrap the
    //                                                    // propTypes object, e.g. `forbidExtraProps`.
    //                                                    // If this isn't set, any propTypes wrapped in
    //                                                    // a function will be skipped.
    //   }
    // }

}
