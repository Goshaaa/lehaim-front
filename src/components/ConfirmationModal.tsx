interface Props {
    title: string,
    body: string,
    yesCallback?: Function,
    noCallback?: Function
}

function ConfirmationModal({ title, body, yesCallback }: Props) {
    return (
        <>
            <div className="modal fade" id="confirmationModal" aria-labelledby="confirmationModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmationModalLabel">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {body}
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => { yesCallback && yesCallback() }}>
                                Удалить
                            </button>
                            <button
                                type="button"
                                className="btn btn-dark"
                                data-bs-dismiss="modal">
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ConfirmationModal;