import React, {Component} from 'react';
import ReactDOM from 'react-dom';
require('../../static/zoomcharts.js')
const localization_zh = {
    closeButton: "关闭",
    dataRequestFailed: "请求数据失败",
    loadingLabel: "加载中...",
    menu: {
        collapse: "折叠",
        close: "关闭",
        dynamic: "动态",
        expand: "展开",
        fixed: "固定",
        focus: "焦点",
        hide: "隐藏",
        unfocus: "取消焦点"
    },
    toolbar: {
        backButton: "回退",
        backTitle: "导航中回退一步",
        exportButton: "导出",
        exportCSV: "导出为CSV文件",
        exportJpeg: "导出为JPEG文件",
        exportPDF: "导出为PDF文件",
        exportPNG: "导出为PNG文件",
        exportTitle: "导出数据",
        exportXLS: "导出为XLS文件",
        fitButton: "适合按钮",
        fitTitle: "适合屏幕",
        freezeButton: "锁定按钮",
        freezeTitle: "全部锁定",
        fullscreenButton: "全屏",
        fullscreenTitle: "切换全屏模式",
        rearrangeButton: "重新排列",
        rearrangeTitle: "重新排列元素",
        unfreezeTitle: "解锁全部",
        zoomoutButton: "缩放按钮",
        zoomoutTitle: "缩放"
    }
}
export default class ZoomCharts extends Component {

    graphClick(event) {
        event.preventDefault();
        if (event.clickNode) {
            if (this.props.onClick) {
                this.props.onClick(event.clickNode.data);
            }
        }
    }

    doubleClick(event) {
        event.preventDefault();
        if (event.clickNode) {
            if (this.props.onDoubleClick) {
                this.props.onDoubleClick(event.clickNode.data);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.netData);
        this.netchart.replaceSettings({
            navigation: {
                focusNodeExpansionRadius: nextProps.expansionRadius,
                initialNodes: nextProps.focusNodes
            }
        });
        this.netchart.replaceData(nextProps.netData);
        this.netchart.paintNow(true);
    }

    componentDidMount() {
        let DOM = this.refs.container;
        let _this = this;
        _this.netchart = new NetChart({
            container: DOM,
            area: {
                height: 600
            },
            style: {
                nodeDetailMinSize: 10,
                selection: {
                    fillColor: "#9aabeb",
                    sizeProportional: .3
                },
                nodeSelected: {
                    radius: 50
                },
            },
            assetsUrlBase: "/static/assets/tianxin/js/lib/assets/",
            // data: { url: "https://zoomcharts.com/dvsl/data/net-chart/company-network-small.json?nodes=6378" },
            data: {
                preloaded: _this.props.netData
            },
            navigation: {
                mode: "focusnodes",
                focusNodeExpansionRadius: _this.props.expansionRadius || 1,
                numberOfFocusNodes: _this.props.focusNodesNum || 1,
                initialNodes: _this.props.focusNodes || [],
                expandOnClick: false
            },
            events: {
                onClick: _this.graphClick.bind(this),
                onDoubleClick: _this.doubleClick.bind(this),
            },
            localization:localization_zh,
        });
    }

    render() {
        return (
            <div ref="container"></div>
        )
    }
}
