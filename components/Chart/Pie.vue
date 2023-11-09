<template>
    <div class="hello" ref="chartdiv"></div>
</template>

<script setup>
    import * as am5 from '@amcharts/amcharts5';
    import * as am5percent from '@amcharts/amcharts5/percent';
    import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

    const props = defineProps(['data'])


    const chartdiv = ref(null)
    let vueChart = shallowRef({ root: null })
    onMounted(() => {
        let  root = am5.Root.new(chartdiv.value);
        root._logo.dispose();
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                endAngle: 270,
                layout: root.verticalLayout
            })
        );

        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: "count_answer",
                categoryField: "answer_desc",
                endAngle: 270
            })
        );

        series.states.create("hidden", {
            endAngle: -90
        });

        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        series.data.setAll(props.data);

        // Create legend
        // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
        let legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            marginTop: 15,
            marginBottom: 15
        }));

        legend.data.setAll(series.dataItems);
            


        chart.appear(1000, 100)
        vueChart.root = root
    })
    
    onBeforeUnmount(() => {
        if (vueChart.root) {
            vueChart.root.dispose();
        }
    })
    

</script>

<style lang="scss" scoped>

</style>