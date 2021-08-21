<script context="module">
    import { logout } from "../service";
    export const ssr = false;

    logout()
    window.location.replace('/')
</script>