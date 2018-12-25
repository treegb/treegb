var optionsNetwork = {
    groups: {
        focus: {
            /* > Short: All options described in the --{nodes module}-- that make sense can be used here.
             * So of course you can use --{chosen,, node,, function (custom callback function)}-- in here,
             * so now notonly your [node][target group],, background color, be changed, but also the chosen status be changed too. < */

            color: {
                background: "#FC97C4",
                border: "#E92B80"
            },
            chosen: {
                node: function (values, id, selected, hovering) {
                    values.color = "#FFD2E6";
                    values.borderColor = "#E92B80";
                    values.borderWidth = 4;
                    // > Need to sync with --{nodes,, borderWidthSelected}--. <
                }
            }
        }
    },
    nodes: {
        shape: "circle",
        //physics: false,
        // > Adding this line will failing the whole graph, don't know why. <
        scaling: {
            //min: 16,
            //max: 128,
            label: {
                /* > Notice,, label size: Shapes like ellipse and circle ... will not change the scale effect
                 * unless --{label}-- options are given,
                 * since these shapes,, label size scalled first, then the shapes itself followed to fit the label size. <
                 * > Notice,, label,, min/max: These 2 value are not to control the EXACT value of --{value}-- of a node,
                 * they are more like "proportional" concept, so either you lower the --{min}-- from 14 to 8
                 * , or raise the --{max}-- from 30 to 60, will "exaggerate" the scaling of those noede having different --{value}-- value.
                 * In other words, 3 nodes with values 1, 2, 4, have same scalling effect as with values 16, 32, 64. < */

                min: 16,
                // > Default: 14. <
                max: 128
                // > Default: 30. <
            }
        },
        borderWidth: 1,
        // > Default: 1. <
        borderWidthSelected: 4,
        // > Default: 2. <
        chosen: {
            node: function (values, id, selected, hovering) {
                values.color = "#D2E5FF";
                values.borderColor = "#2B7CE9";
                values.borderWidth = 4;
                // > Need to sync with --{nodes,, borderWidthSelected}--. <
            }
        }
        //widthConstraint: {
        //    maximum: 260
        //    /* > Short: The intent of this option is not to directly limit the width of node, but the label of node
        //     * , so the long label will line_breaks/wraping to keep the width small. <
        //     * > Long: If a number is specified, the maximum width of the node is set to the value.
        //     * The node's label's lines will be broken on spaces to stay below the maximum. <
        //     * > Also see: http://visjs.org/examples/network/nodeStyles/widthHeight.html . < */
        //}
    },
    edges: {
        arrows: {
            to: {enabled: false, scaleFactor:1, type:'arrow'},
            from: {enabled: false, scaleFactor:1, type:'arrow'}
        },
        color: {
            //color: 'red',
            //highlight: 'yellow'
            inherit: "both"
        },
        font: {
            size: 18
            // > Default: 14. Increase it because edge,, font size is to tiny visually, when nearby node is huge. <
        },
        smooth: {
            type: "continuous"
        },
        //length: 500,
        // > I  increase this to avoid some bigger nodes,, edges being too close. <
        width: 3,
        // > 1 is too thin. <
        selectionWidth: 10,
        widthConstraint: 100
            /* > Short: Limit maximum label width of the edges. <
             * > Long: If a number is specified, the maximum width of the edge's label is set to the value.
             * The edge's label's lines will be broken on spaces to stay below the maximum. <
             * > Also see: http://visjs.org/examples/network/nodeStyles/widthHeight.html . < */
    },
    layout: {
        randomSeed: 123,
        //hierarchical: {
        //    enabled: true
        //}
    },
    physics: {
        maxVelocity: 10,
        // > Debrease the max velocity from 50 to lower value to decrease the unconfortable shaking movement. <
        barnesHut: {
            springConstant: 0.01,
            /* > Short: This is how 'sturdy' the springs are. Higher values mean stronger springs.<
             * > Default: 0.04. < */
            //springLength: 300,
            // > Default value 95. The edges are modelled as springs. This springLength here is the the rest length of the spring. <
            avoidOverlap: 1.0
            /* > Short: Accepted range: [0 .. 1]. When larger than 0 (default), the size of the node is taken into account.
             * The distance will be calculated from the radius of the encompassing circle of the node for both the gravity model.
             * Value 1 is maximum overlap avoidance. < */
        }
    }
};
