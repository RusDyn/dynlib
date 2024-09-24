import { toast } from 'sonner';
export var onSubmitResult = function (res) {
    if (res.error) {
        toast.error(res.error);
    }
    else {
        var successMessage = res.success || "Successfully updated!";
        //va.track(`Updated `);
        //setOpen(false);
        //router.refresh();
        toast.success(successMessage);
    }
};
export var getSubmitHandler = function (params) {
    var name = params.name, _a = params.data, data = _a === void 0 ? {} : _a, setTransition = params.setTransition, handleSubmit = params.handleSubmit;
    return function (value) {
        var formData = new FormData();
        formData.append(name, value);
        // append additional data
        for (var key in data) {
            formData.append(key, data[key]);
        }
        if (typeof handleSubmit === 'function') {
            setTransition(function () {
                handleSubmit(formData).then(onSubmitResult);
            });
            return;
        }
    };
};
