/**
 * Created by liubingwen on 2017/10/23.
 */
import {isMobile} from 'utils/assist'
import {isVisible} from 'utils/dom'
export default {
  props: {
    offset: {
      type: Number,
      default: 0
    },
    // 是否立即执行
    begin: {
      type: Boolean,
      default: false
    },
    // 禁用滚动计算
    scrollListen: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      end: false,
      status: false
    }
  },
  created () {
    if (!this.$isServer) {
      this.addVM()
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    addVM () {
      const {parent} = this
      parent && parent.setVM(this)
    },
    removeVM () {
      const {parent} = this
      parent && parent.removeVM(this)
    },
    start () {
      // 执行运动校验
      const {begin} = this
      if (begin || this.isVisible()) {
        const {status, end} = this
        if (status || end) return ''
        this.status = true
        this.$emit('start', this)
        this.show()
        return false
      } else {
        return true
      }
    },
    endCallback () {
      this.end = true
      this.status = false
      this.$emit('end', this)
    },
    isVisible () {
      const {scrollListen, offset} = this
      if (!scrollListen) return false
      return isVisible(this.$el, offset)
    }
  },
  computed: {
    parent () {
      const {scrollListen} = this
      if (scrollListen) {
        let parent = this.$parent
        while (parent && parent.$options.name !== 'UAnimateContainer') {
          parent = parent.$parent
        }
        return parent
      } else {
        return undefined
      }
    },
    // 判断是否在手机启动
    disabled () {
      if (this.parent) {
        return !this.parent.conf.mobile && isMobile()
      } else {
        return false
      }
    }
  }
}
