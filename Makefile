DOCKER_UI_BASE_IMAGE_NAME ?= adharaprojects/ui-base-image
DOCKER_BFF_BASE_IMAGE_NAME ?= adharaprojects/bff-base-image
DOCKER_IMAGE_NAME ?= adharaprojects/frontend
DOCKER_IMAGE_TAG ?= latest
DOCKER_MOCK_TAG_PREFIX ?= mock
COMMIT_SHORT_HASH := $(shell git rev-parse --short HEAD)


.PHONY: test-contracts
test-contracts:
	make docker-build-mock
	hack/test-contracts.sh

