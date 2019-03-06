(function(Blotter) {

    Blotter.BungeeDesignMaterial = function() {
      Blotter.Material.apply(this, arguments);
    };
  
    Blotter.BungeeDesignMaterial.prototype = Object.create(Blotter.Material.prototype);
  
    Blotter._extendWithGettersSetters(Blotter.BungeeDesignMaterial.prototype, (function () {
  
      function _mainImageSrc () {
        var mainImageSrc = [
            "void mainImage(out vec4 mainImage, in vec2 fragCoord) {",
            "    vec2 uv = fragCoord.xy / uResolution.xy;",
            "    vec3 red = vec3(1.0, 0.0, 0.0); // (R, G, B)",
            "    mainImage = vec4(red, textTexture(uv).a);",
            "}"
          ].join("\n");
  
        return mainImageSrc;
      }
  
      return {
  
        constructor : Blotter.BungeeDesignMaterial,
  
        init : function () {
          this.mainImage = _mainImageSrc();
          this.uniforms = {
            uDivisions : { type : "1f", value : 5.0 },
            uDivisionWidth : { type : "1f", value : 0.25 },
            uAnimateHorizontal : { type : "1f", value : 0.0 },
            uFlipAnimationDirection : { type : "1f", value : 0.0 },
            uSpeed : { type : "1f", value : 0.2 }
          };
        }
      };
  
    })());
  
  })(
    this.Blotter
  );
  